const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`서버 오류:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`서버가 ${rinfo.address}:${rinfo.port} 로부터 메시지를 받음: ${msg}`);
});

server.on('message', (msg, rinfo) => {
  // 16진수 문자열로 변환
  const hexString = msg.toString('hex');
  console.log(`서버가 ${rinfo.address}:${rinfo.port} 로부터 메시지를 받음: ${hexString}`);
});
server.bind(2105); // UDP 서버가 2105 포트에서 수신 대기합니다.
