import argparse
import subprocess

def handle_connection(ip):
    if check_connection(ip) is False:
        if connect(ip) is False:
            return

def check_connection(ip):
    if ip in str(subprocess.check_output(['adb', 'devices'])):
        return True
    return False

def connect(ip, err_count=0):
    if "unable" in str(subprocess.check_output(['adb', 'connect', ip])):
        err_count += 1
        if err_count >= 3:
            print("Unable to connect to", ip, "after", err_count, "retries")
            return False
        else:
            return connect(ip, err_count)
    print("Connected to", ip)
    return True

def main():
    parser = argparse.ArgumentParser(description='Control Android TVs')
    parser.add_argument("--host", dest='host', help="TV's ip address")
    parser.add_argument("--input", dest='input', help="TV's input key")
    args = parser.parse_args()

    if args is None:
        return print("Please set your TV's IP-address with a --host parameter and an input key with an --input parameter")

    if args.host is None:
        return print("Please set your TV's IP-address with a --host parameter")

    if args.input is None:
        return print("Please set an input key an --input parameter")

    handle_connection(args.host)

    try:
        subprocess.check_output(['adb', 'shell', 'input', 'keyevent', args.input])
    except:
        print("Error connecting to TV")

if __name__ == '__main__':
    main()