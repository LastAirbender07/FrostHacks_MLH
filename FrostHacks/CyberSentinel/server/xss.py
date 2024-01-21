import subprocess

def run_xsstrike(url):
    command = [
        "python",
        "D:\\Hackathons\\FrostHacks\\CyberSentinel\\server\\XSStrike\\xsstrike.py",
        "-u", url,
        "--crawl",
        "--level", "3",
        "--threads", "10",
        "--delay", "2",
        "--skip-dom",
        "--blind",
        "--console-log-level", "DEBUG"
    ]

    try:
        result = subprocess.run(command, check=True, capture_output=True, text=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"An error occurred: {e}")
        return None

url = "http://testphp.vulnweb.com/login.php"
output = run_xsstrike(url)

if output is not None:
    print(output)
