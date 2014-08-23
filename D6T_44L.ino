// D6T-44L test program for Arduino
// D6T_test_Arduino.ino
// 2013/03/27 http://www.switch-science.com
// http://mag.switch-science.com/2013/03/27/mems_temp_sensor/
 
#include <Wire.h>
#include <WireExt.h>
 
#define D6T_addr 0x0A
#define D6T_cmd 0x4C
 
int rbuf[35];
float tdata[16];
float t_PTAT;
 
void setup()
{
  Wire.begin();
  Serial.begin(9600);
  Serial.flush();
  
  pinMode(17,OUTPUT);    // 電源(VCC)用設定 D17(A3)ピン
  digitalWrite(17,HIGH);
  pinMode(16,OUTPUT);    // 電源(GND)用設定 D16(A2)ピン
  digitalWrite(16,LOW);
}
 
void loop()
{
  int i;
  Wire.beginTransmission(D6T_addr);
  Wire.write(D6T_cmd);
  Wire.endTransmission();
 
  if (WireExt.beginReception(D6T_addr) >= 0) {
    i = 0;
    for (i = 0; i < 35; i++) {
      rbuf[i] = WireExt.get_byte();
    }
    WireExt.endReception();
 
    t_PTAT = (rbuf[0]+(rbuf[1]<<8))*0.1;
    for (i = 0; i < 16; i++) {
      tdata[i]=(rbuf[(i*2+2)]+(rbuf[(i*2+3)]<<8))*0.1;
    }
    output_json(); // JSONで出力
//    output_csv();  // CSVで出力
  }
}
 
// CSVで温度を出力(PTATなし)
void output_csv() {
  for (int i = 0; i < 16; i++) {
    Serial.print(tdata[i]);
    if (i < 15) {
      Serial.print(",");
    } 
    else {
      Serial.println();
    }
  }
}
 
// JSONで温度を出力(PTATあり)
//void output_json() {
//  Serial.println("{");
//  Serial.print("\"PTAT\":");
//  Serial.print(tdata[0]);
//  Serial.println(",");
//  Serial.print("\"TEMP\":[");
//  for (int i = 1; i < 15; i++) {
//    Serial.print(tdata[i]);
//    Serial.print(",");
//  }
//  Serial.print(tdata[15]);
//  Serial.println("]}");
//}

void output_json() {
  Serial.print("{\"PTAT\":");
  Serial.print(t_PTAT);
  Serial.print(",\"TEMP\":[");
  for (int i = 0; i < 15; i++) {
    Serial.print(tdata[i]);
    Serial.print(",");
  }
  Serial.print(tdata[15]);
  Serial.println("]}");
}
