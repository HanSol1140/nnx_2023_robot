import socket

# UDP 서버 설정
UDP_IP = "0.0.0.0"  # 모든 인터페이스에서 수신
UDP_PORT = 2105

# 소켓 생성
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((UDP_IP, UDP_PORT))

print(f"Server listening on {UDP_IP}:{UDP_PORT}")

while True:
    # 데이터 수신
    data, addr = sock.recvfrom(1024)  # 버퍼 크기는 1024 바이트
    print(f"Received message: {data} from {addr}")
