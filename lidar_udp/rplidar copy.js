const { SerialPort } = require('serialport');
const { ByteLengthParser } = require('@serialport/parser-byte-length');

let serialPort = new SerialPort({ path: 'COM3', baudRate: 256000 });

// 바이트 길이 파서 사용
let parser = serialPort.pipe(new ByteLengthParser({ length: 1 }));

// 표준 스캔 요청 패킷
const standardScan = Buffer.from([0xA5, 0x20]);

// 포트가 열리면 표준 스캔 요청을 보냄
serialPort.on('open', function() {
  console.log('Serial Port Opened');
  serialPort.write(standardScan, function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('Standard Scan Request Sent');
  });
});

// 데이터 수신 시 HEX 형태로 출력
parser.on('data', function (data) {
  console.log('Data:', data.toString('hex'));
});

// 에러 처리
serialPort.on('error', function(err) {
  console.log('Error: ', err.message);
});
