from openpyxl import load_workbook

data_file = 'src/data/test.xlsx'

# Load the entire workbook.
wb = load_workbook(data_file)
ws = wb['Sheet1']
all_rows = list(ws.rows)
all_cols = list(ws.columns)

celdas_1 = []
celdas_2 = []
cont = 0
print("\nFirst cell of data:")
for cell in all_cols[0]:
    celdas_1.append(cell.value)
    cont = cont+1
cont = 0
for cell in all_cols[1]:
    celdas_2.append(cell.value)
    cont = cont+1
for i in range(0, len(all_rows)):
    print(celdas_1[i], celdas_2[i])
