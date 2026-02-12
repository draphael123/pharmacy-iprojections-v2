import os
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from pathlib import Path
import json
from typing import Dict, List
import re

class PharmacyDataProcessor:
    """Process pharmacy inventory data from multiple sources"""
    
    def __init__(self, data_root: str):
        self.data_root = Path(data_root)
        self.processed_data = {
            'Belmar': [],
            'Curexa': [],
            'TPH': []
        }
        
    def parse_week_string(self, week_str: str) -> datetime:
        """Convert week strings like 'Week of 12-1' to datetime"""
        match = re.search(r'(\d{1,2})-(\d{1,2})', week_str)
        if match:
            month, day = int(match.group(1)), int(match.group(2))
            # Determine year based on month
            year = 2025 if month >= 9 else 2026
            return datetime(year, month, day)
        
        # Handle 'Feb 2nd' style dates
        month_map = {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
                     'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12}
        for month_name, month_num in month_map.items():
            if month_name in week_str:
                day_match = re.search(r'(\d{1,2})', week_str)
                if day_match:
                    day = int(day_match.group(1))
                    year = 2026 if month_num <= 2 else 2025
                    return datetime(year, month_num, day)
        
        return None
    
    def process_belmar_file(self, file_path: Path, week_date: datetime) -> List[Dict]:
        """Process Belmar CSV files"""
        try:
            df = pd.read_csv(file_path)
            
            # Group by medication (SKU equivalent)
            records = []
            for _, row in df.iterrows():
                sku = f"{row['Medication Name']} {row['Medication Strength']} {row['Medication Form']}".strip()
                records.append({
                    'pharmacy': 'Belmar',
                    'sku': sku,
                    'medication_name': row['Medication Name'],
                    'strength': row['Medication Strength'],
                    'form': row['Medication Form'],
                    'quantity': float(row['Quantity']) if pd.notna(row['Quantity']) else 0,
                    'amount': float(row['Invoice Amount']) if pd.notna(row['Invoice Amount']) else 0,
                    'date': week_date,
                    'week_start': week_date,
                    'invoice_date': pd.to_datetime(row['Invoice Date']) if pd.notna(row['Invoice Date']) else week_date
                })
            return records
        except Exception as e:
            print(f"Error processing Belmar file {file_path}: {e}")
            return []
    
    def process_tph_file(self, file_path: Path, week_date: datetime) -> List[Dict]:
        """Process TPH CSV files"""
        try:
            df = pd.read_csv(file_path)
            
            records = []
            for _, row in df.iterrows():
                if pd.notna(row.get('SKU')) and row['SKU'] not in ['DISPFEE', 'SHIP2DAY', 'ALCOHOLPREPPAD']:
                    records.append({
                        'pharmacy': 'TPH',
                        'sku': row['SKU'],
                        'description': row['Description'],
                        'quantity': float(row['Quantity']) if pd.notna(row['Quantity']) else 0,
                        'unit_price': float(row['Unit Price']) if pd.notna(row['Unit Price']) else 0,
                        'total': float(row['Total']) if pd.notna(row['Total']) else 0,
                        'date': week_date,
                        'week_start': week_date,
                        'filled_date': pd.to_datetime(row['Filled Date']) if pd.notna(row.get('Filled Date')) else week_date
                    })
            return records
        except Exception as e:
            print(f"Error processing TPH file {file_path}: {e}")
            return []
    
    def process_curexa_file(self, file_path: Path, week_date: datetime) -> List[Dict]:
        """Process Curexa Excel files"""
        try:
            df = pd.read_excel(file_path)
            
            records = []
            # Curexa files have similar structure to TPH
            for _, row in df.iterrows():
                if pd.notna(row.get('SKU')) and row['SKU'] not in ['DISPFEE', 'SHIP2DAY']:
                    records.append({
                        'pharmacy': 'Curexa',
                        'sku': row['SKU'] if pd.notna(row.get('SKU')) else 'UNKNOWN',
                        'description': row.get('Description', row.get('Line Item', '')),
                        'quantity': float(row['Quantity']) if pd.notna(row.get('Quantity')) else 0,
                        'unit_price': float(row.get('Unit Price', 0)) if pd.notna(row.get('Unit Price')) else 0,
                        'total': float(row.get('Total', 0)) if pd.notna(row.get('Total')) else 0,
                        'date': week_date,
                        'week_start': week_date
                    })
            return records
        except Exception as e:
            print(f"Error processing Curexa file {file_path}: {e}")
            return []
    
    def scan_and_process_all_data(self):
        """Scan all directories and process all pharmacy data"""
        all_records = []
        
        # Process each month directory
        for month_dir in self.data_root.iterdir():
            if not month_dir.is_dir():
                continue
            
            print(f"Processing {month_dir.name}...")
            
            # Look for week directories
            for week_dir in month_dir.iterdir():
                if not week_dir.is_dir():
                    continue
                
                week_date = self.parse_week_string(week_dir.name)
                if not week_date:
                    continue
                
                print(f"  Processing {week_dir.name}...")
                
                # Process each pharmacy
                for pharmacy_dir in week_dir.iterdir():
                    if not pharmacy_dir.is_dir():
                        continue
                    
                    pharmacy_name = pharmacy_dir.name
                    
                    # Process files in pharmacy directory
                    for file in pharmacy_dir.iterdir():
                        if file.suffix == '.csv':
                            if pharmacy_name == 'Belmar':
                                records = self.process_belmar_file(file, week_date)
                            elif pharmacy_name == 'TPH':
                                records = self.process_tph_file(file, week_date)
                            all_records.extend(records)
                        elif file.suffix in ['.xlsx', '.xls']:
                            if pharmacy_name == 'Curexa':
                                records = self.process_curexa_file(file, week_date)
                                all_records.extend(records)
        
        return all_records
    
    def aggregate_by_week(self, records: List[Dict]) -> pd.DataFrame:
        """Aggregate records by pharmacy, SKU, and week"""
        df = pd.DataFrame(records)
        
        if df.empty:
            return df
        
        # Create week identifier
        df['year_week'] = df['week_start'].dt.strftime('%Y-W%U')
        df['year_month'] = df['week_start'].dt.strftime('%Y-%m')
        
        # Aggregate by pharmacy, SKU, and week
        weekly_agg = df.groupby(['pharmacy', 'sku', 'year_week', 'week_start']).agg({
            'quantity': 'sum',
            'total': 'sum',
            'amount': 'sum'
        }).reset_index()
        
        return weekly_agg
    
    def aggregate_by_month(self, records: List[Dict]) -> pd.DataFrame:
        """Aggregate records by pharmacy, SKU, and month"""
        df = pd.DataFrame(records)
        
        if df.empty:
            return df
        
        df['year_month'] = df['week_start'].dt.strftime('%Y-%m')
        
        # Aggregate by pharmacy, SKU, and month
        monthly_agg = df.groupby(['pharmacy', 'sku', 'year_month']).agg({
            'quantity': 'sum',
            'total': 'sum',
            'amount': 'sum'
        }).reset_index()
        
        return monthly_agg
    
    def calculate_projections(self, df: pd.DataFrame, periods_ahead: int = 4) -> pd.DataFrame:
        """Calculate future projections using moving average"""
        projections = []
        
        for pharmacy in df['pharmacy'].unique():
            pharmacy_df = df[df['pharmacy'] == pharmacy]
            
            for sku in pharmacy_df['sku'].unique():
                sku_df = pharmacy_df[pharmacy_df['sku'] == sku].sort_values('week_start')
                
                if len(sku_df) < 2:
                    continue
                
                # Calculate moving average for quantity
                ma_window = min(4, len(sku_df))
                avg_quantity = sku_df['quantity'].tail(ma_window).mean()
                avg_total = sku_df['total'].tail(ma_window).mean() if 'total' in sku_df else 0
                avg_amount = sku_df['amount'].tail(ma_window).mean() if 'amount' in sku_df else 0
                
                # Calculate trend (linear regression on last n points)
                if len(sku_df) >= 3:
                    recent = sku_df.tail(4)
                    x = np.arange(len(recent))
                    y = recent['quantity'].values
                    if len(x) > 0 and len(y) > 0:
                        z = np.polyfit(x, y, 1)
                        trend = z[0]
                    else:
                        trend = 0
                else:
                    trend = 0
                
                # Generate projections
                last_date = sku_df['week_start'].max()
                
                for i in range(1, periods_ahead + 1):
                    projected_date = last_date + timedelta(weeks=i)
                    projected_quantity = max(0, avg_quantity + (trend * i))
                    projected_total = (avg_total / avg_quantity * projected_quantity) if avg_quantity > 0 else 0
                    projected_amount = (avg_amount / avg_quantity * projected_quantity) if avg_quantity > 0 else 0
                    
                    projections.append({
                        'pharmacy': pharmacy,
                        'sku': sku,
                        'week_start': projected_date,
                        'year_week': projected_date.strftime('%Y-W%U'),
                        'quantity': projected_quantity,
                        'total': projected_total,
                        'amount': projected_amount,
                        'is_projection': True
                    })
        
        return pd.DataFrame(projections)
    
    def generate_summary_statistics(self, df: pd.DataFrame) -> Dict:
        """Generate summary statistics for dashboard"""
        summary = {}
        
        for pharmacy in df['pharmacy'].unique():
            pharmacy_df = df[df['pharmacy'] == pharmacy]
            
            summary[pharmacy] = {
                'total_skus': pharmacy_df['sku'].nunique(),
                'total_quantity': pharmacy_df['quantity'].sum(),
                'total_revenue': pharmacy_df['total'].sum() + pharmacy_df['amount'].sum(),
                'avg_weekly_quantity': pharmacy_df.groupby('year_week')['quantity'].sum().mean(),
                'top_skus': pharmacy_df.groupby('sku')['quantity'].sum().nlargest(10).to_dict()
            }
        
        return summary
    
    def export_to_json(self, weekly_data: pd.DataFrame, projections: pd.DataFrame, 
                       monthly_data: pd.DataFrame, summary: Dict, output_path: str):
        """Export all processed data to JSON for web app"""
        
        # Combine historical and projected data
        weekly_data['is_projection'] = False
        combined_weekly = pd.concat([weekly_data, projections], ignore_index=True)
        
        output = {
            'weekly_data': combined_weekly.to_dict(orient='records'),
            'monthly_data': monthly_data.to_dict(orient='records'),
            'summary': summary,
            'last_updated': datetime.now().isoformat()
        }
        
        # Convert datetime objects to strings
        for record in output['weekly_data']:
            if isinstance(record.get('week_start'), pd.Timestamp):
                record['week_start'] = record['week_start'].isoformat()
        
        for record in output['monthly_data']:
            for key in record:
                if isinstance(record[key], pd.Timestamp):
                    record[key] = record[key].isoformat()
        
        with open(output_path, 'w') as f:
            json.dump(output, f, indent=2)
        
        print(f"Data exported to {output_path}")


def main():
    """Main execution function"""
    processor = PharmacyDataProcessor('../')
    
    print("Scanning and processing all pharmacy data...")
    all_records = processor.scan_and_process_all_data()
    
    print(f"\nProcessed {len(all_records)} total records")
    
    print("\nAggregating by week...")
    weekly_data = processor.aggregate_by_week(all_records)
    
    print("\nAggregating by month...")
    monthly_data = processor.aggregate_by_month(all_records)
    
    print("\nCalculating projections...")
    projections = processor.calculate_projections(weekly_data, periods_ahead=8)
    
    print("\nGenerating summary statistics...")
    summary = processor.generate_summary_statistics(weekly_data)
    
    print("\nExporting to JSON...")
    os.makedirs('../backend', exist_ok=True)
    processor.export_to_json(weekly_data, projections, monthly_data, summary, 
                            '../backend/processed_data.json')
    
    print("\n[SUCCESS] Data processing complete!")
    print(f"  - Weekly records: {len(weekly_data)}")
    print(f"  - Monthly records: {len(monthly_data)}")
    print(f"  - Projections: {len(projections)}")
    print(f"  - Pharmacies: {', '.join(summary.keys())}")


if __name__ == '__main__':
    main()

