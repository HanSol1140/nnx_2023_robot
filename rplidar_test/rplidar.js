const { SerialPort, ReadlineParser } = require('serialport');
let serialPort = new SerialPort({ path: 'COM3', baudRate: 256000 });

let parser = new ReadlineParser();
serialPort.pipe(parser);

// 표준 스캔 요청 패킷
const standardScan = Buffer.from([0xA5, 0x20]);

// 포트가 열리면 표준 스캔 요청을 보냄
// serialPort.on('open', function () {
//     console.log('Serial Port Opened');
//     serialPort.write(standardScan, function (err) {
//         if (err) {
//             return console.log('Error on write: ', err.message);
//         }
//         console.log('Standard Scan Request Sent');
//     });
// });

parser.on('data', function (data) {
    console.log(data.toString('hex'));
});
serialPort.on('error', function (err) {
    console.log('Error: ', err.message);
});


