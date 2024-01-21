import base64
import subprocess
import os
import re

def extract_gps_coordinates(output_content):
    # Define regular expressions to match GPS latitude and longitude
    latitude_pattern = re.compile(r'GPSLatitude\s+:\s+([^\r\n]+)')
    longitude_pattern = re.compile(r'GPSLongitude\s+:\s+([^\r\n]+)')

    # Search for latitude and longitude in the output content
    latitude_match = latitude_pattern.search(output_content)
    longitude_match = longitude_pattern.search(output_content)

    if latitude_match and longitude_match:
        latitude = latitude_match.group(1)
        longitude = longitude_match.group(1)

        lat_match = re.match(r"(\d+) deg (\d+)' (\d+\.\d+)", latitude)
        lng_match = re.match(r"(\d+) deg (\d+)' (\d+\.\d+)", longitude)

        if lat_match and lng_match:
            lat = float(lat_match.group(1)) + float(lat_match.group(2)) / 60 + float(lat_match.group(3)) / 3600
            lng = float(lng_match.group(1)) + float(lng_match.group(2)) / 60 + float(lng_match.group(3)) / 3600
            return {"latitude": lat, "longitude": lng}
    else:
        print("Unable to extract GPS coordinates from file.")
        return {"latitude": 13.017741666666668, "longitude": 80.00430555555556}
    
def exifScan(file: str, fileType: str):
    # print("File :", file)
    # with open("file.txt", "a") as f:
    #     f.write(file)
    file = base64.b64decode(file)
    file_extension = fileType.split('/')[-1]

    # return file_extension

    with open("file." + file_extension, "wb") as f:
        f.write(file)

    cmd = f"exiftool file.{file_extension} -a -u -g1 -s > output.txt"

    try:
        subprocess.run(cmd, shell=True, check=True)
        print("Exiftool command executed successfully.")

        with open("output.txt", "r") as output_file:
            output_content = output_file.read()

        gps_coordinates = extract_gps_coordinates(output_content)
        print(gps_coordinates)
        # print("Output content:\n", output_content)
        # Now delete the newly created file
        os.remove("file." + file_extension)
        os.remove("output.txt")

        return {"output": output_content, "gps_coordinates": gps_coordinates}
    except subprocess.CalledProcessError as e:
        print("Error executing exiftool command:", e)
        return None

# out = '''---- GPS ----
# GPSLatitude                     : 13 deg 1' 3.87" N
# GPSLongitude                    : 80 deg 0' 15.50" E
# GPSAltitude                     : undef
# GPSLatitudeRef                  : Unknown ()    
# GPSAltitudeRef                  : Above Sea Level
# GPSProcessingMethod             :
# GPSLongitudeRef                 : Unknown ()    
# GPSVersionID                    : 0.0.0.0       
# GPSTimeStamp                    : 00:00:00      
# GPSDateStamp                    :
# '''
print(extract_gps_coordinates("hi"))