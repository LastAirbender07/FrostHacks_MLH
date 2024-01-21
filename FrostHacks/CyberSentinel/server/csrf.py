import subprocess
import os

url = input("Enter the URL: ")
main_py_path = "XSRFProbe\main.py"
output_file = "output.txt" 
log_folder = "xsrfprobe-output"
command = f"python {main_py_path} -u {url} -v --malicious --crawl"

try:
    with open(output_file, "w") as output:
        subprocess.run(command, shell=True, check=True, stdout=output, stderr=subprocess.STDOUT)
    print(f"Command output saved to {output_file}")
except subprocess.CalledProcessError as e:
    print(f"Error executing the command: {e}")
except Exception as e:
    print(f"An error occurred: {e}")

domain  = url.split("//")[1].split("/")[0]
headers = ['www.', 'demo.']
for i in headers:
    if i in domain :
        domain  = domain .replace(i,"")
        
try:
    log_folder = os.path.join("xsrfprobe-output", domain)
    os.makedirs(log_folder, exist_ok=True)

    with open(output_file, "a") as output:
        log_files = [f for f in os.listdir(log_folder) if f.endswith(".log")]
        output.write("\n" + "=" * 80 + "\n")
        for log_file in log_files:
            log_file_path = os.path.join(log_folder, log_file)
            output.write(f"--- Log File: {log_file} ---\n")
            
            with open(log_file_path, "r") as log_content:
                output.write(log_content.read())
            
            output.write("\n" + "=" * 80 + "\n")
    
    print(f"Command output and log files appended to {output_file}")
except subprocess.CalledProcessError as e:
    print(f"Error executing the command: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
