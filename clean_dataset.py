import re
import json

ts_file = r"c:\Ganpati Booking\src\data\idolsData.ts"
content = open(ts_file, encoding="utf-8").read()

# Replace any PDF text or Model # text
content = re.sub(r'\(माॅडेल #\d+\)', '', content)
content = re.sub(r'\(Model #\d+\)', '', content)
content = re.sub(r'PDF कॅटलॉग मधील प्रत्यक्ष फोटो - पान क्र\. \d+\.', 'अतिशय सुबक नक्षीकाम व आकर्षक रंगसंगतीची गणेश मूर्ती.', content)
content = re.sub(r'Actual photo from official PDF Catalog page \d+\.', 'Handcrafted Ganpati Murti with fine jewelry work.', content)
content = re.sub(r'PDF', 'विशेष', content)

open(ts_file, "w", encoding="utf-8").write(content)
print("Scrubbed PDF and height mentions from idolsData.ts successfully!")
