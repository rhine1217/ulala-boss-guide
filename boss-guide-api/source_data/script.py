import csv
import json
from pathlib import Path

class DataFixtures:

    def __init__(self, model: str, fields: list):
        self.app_name = 'main_app'
        self.model = model # e.g. 'UlalaClass'
        self.model_name = f'{self.app_name}.{model.lower()}' # e.g. 'main_app.ulalaclass'
        self.fields = fields
        self.output = []
        
    def __definepath(self, file_date):
        return {
          "source_file": f'{self.model}_{file_date}.csv',
          "target_file": f'{Path.cwd().parent}/{self.app_name}/fixtures/{self.model}_{file_date}.json'
        }
        
    def __writefile(self, target_file):
        with open(target_file, 'w') as jsonfile:
            jsonfile.write(json.dumps(self.output))
      
    def create_fixtures(self, file_date: str):
        source_file, target_file = self.__definepath(file_date).values()
        
        with open(source_file, newline='') as csvfile:
            data = csv.reader(csvfile, delimiter=',')
            next(data, None)
            for row in data:
                new_row = {
                  "model": self.model_name,
                  "pk": int(row[0]),
                  "fields": {}
                }
                for idx, field in enumerate(self.fields):
                    new_row["fields"][field] = row[idx+1]
                self.output.append(new_row)
        self.__writefile(target_file)

class DataFixtures_M2M(DataFixtures):
  
    def __init__(self, model: str, fields: list, m2m_fields: list, m2m_data_type="single"):
        DataFixtures.__init__(self, model, fields)
        self.m2m_fields = m2m_fields
        self.m2m_data_type = m2m_data_type
        
    def m2m_converter(self, text: str):
        if self.m2m_data_type == "single":
            return [int(text)]
        elif self.m2m_data_type == "many":
            return [int(fk) for fk in text.split(":") if fk != ""]

    def create_fixtures(self, file_date: str):
        source_file, target_file = self._DataFixtures__definepath(file_date).values()
    
        with open(source_file, newline='') as csvfile:
            data = csv.reader(csvfile, delimiter=',')
            next(data, None)
            curr_pk = 0
            for row in data:
                
                if int(row[0]) > curr_pk:
                    new_row = {
                      "model": self.model_name,
                      "pk": int(row[0]),
                      "fields": {}
                    }
                    
                    for idx, field in enumerate(self.fields):
                        new_row["fields"][field] = row[idx+1]
                    
                    for idx, field in enumerate(self.m2m_fields):
                        m2m_fk = self.m2m_converter(row[len(self.fields)+idx+1])
                        new_row["fields"][field] = m2m_fk
                    
                    self.output.append(new_row)
                    curr_pk = int(new_row["pk"])
                
                else:  # i.e. not the first record, add to the m2m fields
                    for idx, field in enumerate(self.m2m_fields):
                        target_m2m_field = self.output[int(row[0])-1]["fields"][field]
                        target_m2m_field.append(int(row[len(self.fields)+idx+1]))

        self._DataFixtures__writefile(target_file)
    
UlalaClass = DataFixtures(model="UlalaClass", fields=['name'])
UlalaMapArea = DataFixtures(model="UlalaMapArea", fields=['continent', 'area'])
UlalaBoss = DataFixtures_M2M(model="UlalaBoss", fields=['name'], m2m_fields=['map_area'])
UlalaToy = DataFixtures_M2M(model="UlalaToy", fields=['name', 'description'], m2m_fields=['related_class'], m2m_data_type="many") # img_url = null for now
UlalaSkill = DataFixtures(model="UlalaSkill", fields=['name', 'description', 'related_class'])

# UlalaClass.create_fixtures('04152021')
# UlalaMapArea.create_fixtures('04152021')
# UlalaBoss.create_fixtures('04172021')
# UlalaToy.create_fixtures('04172021')
# UlalaSkill.create_fixtures('04172021')


# command: python manage.py loaddata <fixturename>
