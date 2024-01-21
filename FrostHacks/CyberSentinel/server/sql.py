# import subprocess

# def scan_url(url):
#     output_file = "D:\Hackathons\FrostHacks\CyberSentinel\server"
#     command = [
#         "D:\Hackathons\FrostHacks\CyberSentinel\server\sqlmap-dev\sqlmap.py",
#         "-u", url,  # Target URL
#         "-a",  # Retrieve everything
#         "-f",  # Fingerprint database management system
#         "-b",  # Retrieve DBMS banner
#         "-v", "3",  # Verbosity level 3 for detailed output
#         '--batch',  # Run in batch mode (no user interaction)
#         '--level', '3',  # Set the level of tests to perform (1-5)
#         '--risk', '2',  # Set the risk of tests to perform (1-3)
#         '--output-dir', output_file,  # Set the output directory
#         '--txt'  # Save the detailed report in a text file
#     ]

#     subprocess.run(command, check=True)  # Run sqlmap with the specified options

# if __name__ == "__main__":
#     url = input("Enter the URL to scan: ")
#     scan_url(url)

# # import subprocess

# # def run_sqlmap(url, output_file):
# #     # Construct the command to run SQLMap
# #     command = [
# #         'python', 'sqlmap.py',
# #         '--url', url,
# #         '--batch',  # Run in batch mode (no user interaction)
# #         '--level', '3',  # Set the level of tests to perform (1-5)
# #         '--risk', '2',  # Set the risk of tests to perform (1-3)
# #         '--output-dir', output_file,  # Set the output directory
# #         '--txt'  # Save the detailed report in a text file
# #     ]

# #     try:
# #         # Run SQLMap using subprocess
# #         subprocess.run(command, check=True)
# #         print(f"SQLMap report saved in: {output_file}")
# #     except subprocess.CalledProcessError as e:
# #         print(f"Error running SQLMap: {e}")

# # if __name__ == "__main__":
# #     # Specify the target URL
# #     target_url = "http://www.example.com/vuln.php?id=1"

# #     # Specify the output file path
# #     output_file = "sqlmap_report"

#     # Run SQLMap
#     # run_sqlmap(target_url, output_file)


import subprocess

def scan_url(url):
    output_file = "D:\Hackathons\FrostHacks\CyberSentinel\server"
    command = [
        "D:\Hackathons\FrostHacks\CyberSentinel\server\sqlmap-dev\sqlmap.py",  # Corrected path
        "-u", url,  # Target URL
        "-a",  # Retrieve everything
        "-f",  # Fingerprint database management system
        "-b",  # Retrieve DBMS banner
        "-v", "3",  # Verbosity level 3 for detailed output
        '--batch',  # Run in batch mode (no user interaction)
        '--level', '3',  # Set the level of tests to perform (1-5)
        '--risk', '2',  # Set the risk of tests to perform (1-3)
        '--output-dir', output_file,  # Set the output directory
        '--txt'  # Save the detailed report in a text file
    ]

    subprocess.run(command, check=True)  # Run sqlmap with the specified options

if __name__ == "__main__":
    url = input("Enter the URL to scan: ")
    scan_url(url)
