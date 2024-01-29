

import json

# Load the JSON data
with open("F:/Next-js/shop-1.0/src/lib/districts.json", "r") as file:
    dhaka_data = json.load(file)

# Extract the desired data
districts = [{"district": district["district"], "_id": district["district"].lower()} for district in dhaka_data["data"]]

# Generate TypeScript code
ts_code = f"""
const districts: string[] = {json.dumps(districts)};
"""

# Save the TypeScript code to a file
with open("districts.ts", "w") as file:
    file.write(ts_code)