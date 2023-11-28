const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`Server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  const hexString = msg.toString('hex');
  const formattedString = hexString.match(/.{1,10}/g).join('\n');
  console.log(`Server received from ${rinfo.address}:${rinfo.port}:\n${formattedString}`);
  // 여기에서 메시지를 파싱하고 처리합니다.
});

server.on('listening', () => {
  const address = server.address();
  console.log(`Server listening ${address.address}:${address.port}`);
});

server.bind(2105); // LTME-01C 라이다 기기의 데이터를 수신하는 포트
