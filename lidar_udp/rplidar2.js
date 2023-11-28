const { SerialPort } = require('serialport');
const { ByteLengthParser } = require('@serialport/parser-byte-length');

let serialPort = new SerialPort({ path: 'COM3', baudRate: 256000 });

// 바이트 길이 파서 사용
let parser = serialPort.pipe(new ByteLengthParser({ length: 1 }));

// 표준 스캔 요청 패킷
const standardScan = Buffer.from([0xA5, 0x20]);

// 포트가 열리면 표준 스캔 요청을 보냄
serialPort.on('open', function () {
  console.log('Serial Port Opened');
  serialPort.write(standardScan, function (err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('Standard Scan Request Sent');
  });
});
// 데이터 수신 시 HEX 형태로 출력
let count = 0;
let dataString = "";

let isPaused = false;

parser.on('data', function (data) {
  if (isPaused) return; // 데이터 처리를 일시적으로 중지

  count++;
  dataString += data.toString('hex');
  dataString += " ";
  if (count == 5) {
    let bytes = dataString.split(' ').map(hex => parseInt(hex, 16));
    let angle = (((bytes[1] & 0x7F) | (bytes[2] << 7n)) / 64.0).toFixed(2);
    let distance = (((bytes[3]) | (bytes[4] << 8)) / 4.0).toFixed(2);
    console.log(dataString);
    console.log("각도 : " + angle + " / 거리 : " + distance );
  
    dataString = "";
    count = 0;
  }
  // 데이터 처리를 일시적으로 중지하고 3초 후에 다시 시작
  isPaused = true;
  setTimeout(() => {
    isPaused = false;
  }, 100);
});

// 에러 처리
serialPort.on('error', function (err) {
  console.log('Error: ', err.message);
});
// =============================================================================
