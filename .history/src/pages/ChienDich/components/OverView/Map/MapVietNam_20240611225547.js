import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MapVietNam.module.scss';

const cx = classNames.bind(styles);

const provinces = [
  {
    id: 'VinhPhuc',
    name: 'Vĩnh Phúc',
    d: `M194,169.9c-0.5,0-0.8,0-1.1,0s-0.3-0.1-0.5-0.3c-0.1-0.1-0.2-0.2-0.3-0.3
c-0.2-0.2-0.9-1.2-1.1-1.6c-0.1-0.2-0.2-0.8-0.2-1c0-0.1,0-0.2,0-0.3c0.2-0.3,0.3-0.8,0.3-1.4c0-0.5-0.3-0.9-0.9-1.5
c-0.1-0.1-0.1-0.1-0.2-0.2c-0.3-0.4-0.8-0.6-1.4-0.8c0-0.2,0-0.6,0.1-0.7c0.4-1-0.1-2-0.7-2.6c-0.3-0.3-0.7-0.4-1.1-0.4
c-0.1,0-0.3,0-0.4,0c-0.1-0.3-0.2-0.6-0.3-0.9c0.2-0.1,0.3-0.3,0.4-0.4h0.1c0.2,0.1,0.5,0.3,0.9,0.3h0.1c0.1,0.1,0.1,0.3,0.2,0.3
c0.2,0.3,0.6,0.6,1,0.6l0,0c0.4,0,0.8-0.3,1-0.6c0,0,0-0.1,0.1-0.1c0.3-0.1,0.5-0.1,0.8-0.3c0.1-0.1,0.3-0.1,0.4-0.1c0,0,0,0,0.1,0
c0.6,0,1.3-0.4,1.7-0.6l0.4-0.2c0.3-0.1,0.5-0.4,0.6-0.7c0-0.1,0.1-0.1,0.1-0.2l0.1,0.1c0.1,0.4,0.5,0.8,1.2,0.9
c0.1,0.4,0.4,0.9,0.8,1.3c0.1,0.4,0.4,0.7,0.6,1c0.3,0.6,0.8,0.9,1.4,0.9l0,0c0.1,0,0.2,0,0.3,0c0.3,0.3,0.6,0.7,1.1,0.7h0.1
c0.1,0.9,0.9,1.2,1.1,1.2c0.1,0,0.3,0.1,0.4,0.1c0.1,0,0.1,0,0.1,0c-0.1,0.6,0.2,1.2,0.7,1.6l0,0c0,0.1-0.1,0.1-0.1,0.1
c-0.1,0.1-0.1,0.1-0.1,0.2c-0.2,0.2-0.6,0.9-0.7,1.1c-0.1,0.1-0.4,0.4-0.6,0.6c-0.5,0.5-0.8,1.2-0.7,1.8c-0.7-0.4-1.6-0.4-1.6-0.4
c-0.4,0-1.4,0.3-1.7,1.2c-0.3,0.1-0.5,0.3-0.7,0.5c-0.2,0.3-0.3,0.6-0.3,0.9h-0.1c-0.1,0-0.2,0-0.3,0c0,0-0.1,0-0.2,0
C194.7,169.9,194.3,169.9,194,169.9z`
  },
  {
    id: 'YenBai',
    name: 'Yên Bái',
    d: `M162.9,163c-0.1-0.1-0.2-0.2-0.3-0.3l-0.3-0.2c-0.1-0.4-0.3-0.8-0.6-1c0.1-0.3,0-0.7-0.3-1
c-0.2-0.3-0.5-0.4-0.9-0.4c-0.1,0-0.1,0-0.2,0l-0.6,0.1l-1.1,0.1c-0.4,0-0.8,0.3-1,0.7c-0.3-0.1-0.4-0.1-0.5-0.2
c-0.2-0.1-0.3-0.2-0.5-0.3c-0.3-0.1-0.3-0.2-0.5-0.4c-0.3-0.5-0.8-0.9-1.4-0.9c-0.5,0-0.9,0.3-1.2,0.4l0,0c-0.1,0-0.2,0-0.3,0
c-0.2,0-0.5,0-0.6-0.1c-0.1,0-0.2,0-0.3,0c-1.2,0-1.9,1.4-2.2,2c-0.1,0.1-0.3,0.4-0.5,0.6h-0.1c-0.2,0-0.4,0-0.7-0.1
c0.1-0.5-0.2-0.9-0.6-1.1c-0.3-0.2-1-0.5-1.6-0.5c-0.1,0-0.2-0.1-0.2-0.1c-0.4-0.5-1-0.8-1.6-0.8c-0.1,0-0.3,0-0.4,0.1
c-0.1-0.1-0.3-0.3-0.4-0.4c0-0.3-0.1-0.6-0.3-0.9l-0.4-0.4c0-0.3,0.1-0.5,0.1-0.6c0.5-0.7,0.3-1.5,0-2.2l0.2-0.1
c0.4-0.3,0.5-0.9,0.3-1.4l0,0c0.6-0.3,0.8-0.8,1-1.2c0-0.1,0.1-0.2,0.1-0.3s0.1-0.1,0.1-0.1c0.3-0.3,0.8-1,0.4-1.7
c-0.1-0.2-0.4-0.7-1.2-0.7h-1.5c-0.4,0-0.8-0.1-1-0.3c-0.5-0.3-1.4-0.4-2-0.4h-0.1c-0.3,0-0.7,0.2-0.9,0.4l-0.4,0.5c0,0,0,0-0.1,0.1
c-0.1,0-0.1,0-0.1,0h-0.1c-0.3-0.1-0.7-0.3-1.2-0.3c-0.1,0-0.5,0-2.2,0.5c-0.7-0.4-1.1-0.5-1.3-0.5c-0.3-0.4-0.9-0.6-1.6-0.6
c-0.1,0-0.4-0.1-0.5-0.2c-0.1-0.1-0.3-0.1-0.4-0.1c0,0-0.1,0-0.2,0c-0.5,0-0.9,0.1-1.2,0.3c0-0.3-0.2-0.6-0.4-0.8h0.1
c0.5-0.1,0.8-0.5,0.9-0.9v-0.1c0.2-0.2,0.5-0.6,0.6-1.1s-0.1-0.9-0.4-1.2c-0.1-0.1-0.2-0.3-0.3-0.5c-0.2-0.3-0.4-0.6-0.6-0.8
c-0.1-0.1-0.5-0.6-0.8-0.9l-1.1-1.2c0-0.3,0-0.5-0.1-0.7c0,0,0.1,0,0.1-0.1c0.3,0.2,0.6,0.3,0.7,0.3s0.2,0.1,0.3,0.1
c0.3,0,0.7-0.1,0.9-0.4l0.5-0.6l0.4,0.5c0.2,0.3,0.5,0.4,0.9,0.4c0.1,0,0.1,0,0.1,0l0,0c0,0,0.1,0,0.3,0c0.3,0,0.5,0.1,0.5,0.1
c0.5,0.2,1.6,0.6,1.6,0.6c0.1,0.1,0.3,0.1,0.4,0.1c0.4,0,0.7-0.2,0.9-0.5l0,0c0,0,0,0,0.1,0c0.3,0.2,0.7,0.5,0.9,0.6
c0.1,0.1,0.3,0.1,0.5,0.2c0.1,0,1.4,0.1,2.2,0.1c0.3,0,0.5,0,0.7-0.1c0.6-0.1,1.2-0.4,1.3-0.4c0.5-0.2,0.8-0.7,0.7-1.3
c0.2,0,0.4,0,0.6-0.1c0,0,0,0,0.1,0c0.2,0.1,0.4,0.3,0.5,0.3c0.1,0.1,0.3,0.1,0.5,0.2c0.2,0.4,0.4,0.7,0.5,0.8
c0.2,0.2,0.7,0.7,0.7,0.7c0.2,0.2,0.5,0.3,0.8,0.3c0.2,0,0.4-0.1,0.6-0.2l1.4-0.8c0.3-0.2,0.5-0.4,0.5-0.7c0-0.1,0-0.2,0.1-0.3
c0.3-0.1,0.7-0.3,1.2-0.8c0.3-0.2,0.4-0.5,0.4-0.9c0-0.1,0-0.9-0.1-1.3c-0.1-0.4-0.2-1.6-0.3-1.6c0-0.1,0-0.2-0.1-0.3l-0.5-1.2
c0,0,0-0.1-0.1-0.1l-0.7-1.2c-0.1-0.1-0.1-0.2-0.2-0.3l-0.1-0.1c0.9-0.6,0.9-1.5,0.9-2l-0.3-1.4v-0.1c0.1,0.1,0.2,0.1,0.3,0.1
c0.1,0.3,0.3,0.7,0.7,0.9c0.3,0.2,1,0.8,1.3,1.1c0.1,0.1,0.1,0.1,0.2,0.1c0.3,0.2,0.7,0.4,0.8,0.5c0.3,0.5,0.8,0.8,1.2,1
c0.2,0.1,0.4,0.3,0.5,0.3c0.2,0.1,0.4,0.2,0.7,0.2c0.1,0,0.1,0,0.2,0c0.3-0.1,0.6-0.2,0.7-0.5c0.6-0.9,0.7-1.3,0.7-1.4
c0.1-0.3,0.1-0.8,0.1-1.1l0.1-0.5h0.6c0.3,0,0.6-0.1,0.8-0.4c0.2-0.2,0.3-0.5,0.3-0.9l-0.1-1l0.2-0.9c0.1-0.4-0.1-0.8-0.4-1.1
l-0.1-0.1c0.4,0.1,0.7,0.2,1,0.3c0.3,0.1,0.9,0.2,1.4,0.3l0,0l-0.3,0.3c-0.2,0.2-0.3,0.5-0.3,0.8s0.2,0.6,0.4,0.8l2,1.7
c0.2,0.2,0.5,0.3,0.7,0.3h0.1c0.5,0,1.5-0.1,1.8-0.1c0.2,0,0.5,0,0.9-0.1l0.3,0.7c0.1,0.6,0.3,1.4,0.3,1.6c0,0.9,0.9,1.6,1.4,1.8
c0.2,0.1,0.9,0.5,1.5,0.6c0.1,0.4,0.3,0.7,0.7,0.9l1.1,0.5c0.1,0.1,0.3,0.1,0.5,0.1v0.1c0,1.4-0.1,1.8-0.1,1.9
c-0.1,0.6,0,1.3,0.4,1.7c0.2,0.2,0.4,0.4,0.6,0.5c0,0.8,0.5,1.5,1.4,1.8c0.1,0.1,0.1,0.2,0.1,0.3s0.1,0.2,0.2,0.3
c0.2,0.3,0.5,0.7,0.6,0.9c0.1,0.3,0.4,0.5,0.7,0.8l-0.2,0.3c-0.2,0.2-0.3,0.5-0.3,1c-0.1,0.1-0.1,0.1-0.2,0.1
c-0.3,0.2-0.5,0.5-0.5,0.9c0,0.3,0.1,0.7,0.4,0.9c0,0,0.2,0.1,0.3,0.3v0.1c-0.1-0.1-0.2-0.1-0.3-0.2c-0.2-0.1-0.4-0.2-0.6-0.2
c-0.2,0-0.5,0.1-0.7,0.2c-0.3,0.2-0.7,0.5-0.8,0.6c-0.6,0.3-1,0.6-1.2,0.9c-0.1,0-0.1,0-0.2,0c-0.1,0-0.3,0-0.4,0.1
c-0.6,0.2-0.9,0.4-1.2,0.5c-0.6,0-1.1,0.4-1.6,1c-0.4,0.5-0.5,1.4-0.5,1.7v0.1c0,0.4,0.1,0.9,0.1,1.2c-0.5,0.2-0.9,0.6-1,1.2
c-0.1,0.5,0.1,1,0.5,1.4c0,0.1,0,0.2,0,0.3c0,0.8,0.4,1.8,0.9,2.6l0.1,0.2c0,0.1,0,0.2,0,0.7v0.1c-0.1,0.1-0.2,0.4-0.3,0.5
c-0.4,0.4-0.6,0.8-0.6,1.2c-0.2,0-0.4,0.1-0.5,0.2h-0.1c-0.3,0.1-0.5,0.4-0.7,0.6c-0.1,0-0.1,0-0.1,0c-0.1,0-0.3,0-0.5,0
C163.3,162.9,162.9,163,162.9,163L162.9,163z`
  },
  {
    id: "VinhLong",
    name: "Vĩnh Long",
    d: `M210.4,643.7l-0.1-0.1l-1.2-0.9c-0.1-0.1-0.3-0.1-0.4-0.2l-1.2-0.3l-1.1-0.7
c-0.1-0.1-0.3-0.1-0.4-0.2l-0.2-0.2c0,0,0-0.1-0.1-0.1c-0.5-0.5-1.2-1.1-1.3-1.2c-0.4-0.5-2.2-1.6-2.8-1.9c-0.2-0.1-0.9-0.7-1.2-1
c-0.1-0.1-0.1-0.1-0.2-0.1l0.7-1.1l0.1,0.1c0.2,0.3,0.5,0.5,0.8,0.5h0.1c0.1,0,0.2,0,0.3,0l0.4,0.6c0.2,0.3,0.4,0.4,0.7,0.5
c0.4,0.1,1,0.2,1.4,0.2h0.7c0.2,0,0.5-0.1,0.6-0.2c0.1,0,0.1,0,0.2,0c0.3,0,0.6-0.1,0.9-0.4l0.3-0.3c0.2-0.2,0.3-0.5,0.3-0.9h0.4
c0.5,0,1-0.4,1.1-0.9l0.2-1c0.1-0.3,0-0.7-0.2-0.9l-0.4-0.5v-0.3c0-0.1,0-0.1,0-0.2c0.5-0.1,0.8-0.4,1.1-0.7
c0.1-0.1,0.4-0.4,0.7-0.6c0.3-0.3,0.5-0.4,0.6-0.5c0,0,0,0,0.1,0c0.2,0.2,0.5,0.3,0.7,0.3l0.2,1.8c0,0.4,0.3,0.7,0.7,0.9l0.8,0.4
c0.1,0.1,0.3,0.1,0.5,0.1c0.7,0,1.9,0,2.1,0.1l0,0l0.1,0.1c0.1,0.1,0.2,0.2,0.4,0.3l0.3,0.1l0.1,0.1l0.2,0.2
c0.2,0.2,0.4,0.5,0.6,0.7l0.1,0.2l0.2,1.2c0,0.1,0.1,0.3,0.2,0.4l0.4,0.6c0,0,0,0.1,0.1,0.1l0.4,0.5c0,0.1,0.1,0.1,0.1,0.1l0.6,0.6
c-0.1,0.2-0.2,0.3-0.2,0.3c-0.2,0.4-0.2,0.8-0.2,1.2c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0.1l-0.9,0.3l-0.3-0.2
c-0.2-0.1-0.3-0.1-0.5-0.1s-0.3,0-0.5,0.1c-0.3,0.2-0.5,0.5-0.6,0.8l-0.3,1.7c0,0.1,0,0.2,0,0.3c-0.2-0.1-0.4-0.2-0.6-0.2
c-0.3,0-0.6,0.1-0.9,0.4l-0.1,0.1c-0.5,0.1-0.9,0.4-1.4,0.7H213c-0.1,0-0.2,0-0.2,0c-0.4,0-0.7,0.2-0.9,0.5L210.4,643.7z`
  },
  {
    id: "TuyenQuang",
    name: "Tuyên Quang",
    d: `M188.9,155.8c-0.2-0.2-0.6-0.3-1.1-0.3h-0.1c-0.1,0-0.1-0.1-0.1-0.1c-0.2-0.1-0.5-0.2-0.8-0.2
s-0.6,0.1-0.8,0.1c-0.1,0-0.1,0.1-0.2,0.1c-0.3,0-0.6,0.2-0.8,0.3c-0.1-0.1-0.2-0.1-0.3-0.1c-0.1-0.2-0.2-0.4-0.3-0.6
c-0.1-0.2-0.3-0.3-0.5-0.4c0-0.1,0-0.2-0.1-0.3c-0.1-0.2-0.3-0.8-1-1l0,0c0-0.1,0.1-0.2,0.1-0.3c0.1-0.4,0-0.8-0.2-1.2
c-0.1-0.1-0.1-0.2-0.3-0.3c0.1-0.4,0.1-1-0.5-1.7v-0.1c-0.3-0.3-0.7-0.5-1.1-0.5c-0.1,0-0.2,0-0.3,0c-0.2-0.1-0.5-0.4-0.6-0.5
c-0.3-0.4-0.8-0.6-1.3-0.7c-0.4-0.4-1-0.5-1.3-0.5c-0.1,0-0.3-0.2-0.4-0.2c-0.3-0.3-0.6-0.5-1.2-0.6l0,0c0.3-0.3,0.4-0.6,0.3-1
c0-0.1,0-0.1,0-0.2l0.6-0.9c0.2-0.3,0.2-0.6,0.2-0.9c-0.1-0.3-0.3-0.6-0.5-0.7c-0.3-0.2-0.7-0.5-0.9-0.7c-0.2-0.3-0.5-0.8-0.6-1
c-0.2-0.5-0.6-1.3-1.3-1.6c0-0.5-0.1-1.2-0.5-1.6c-0.1-0.2-0.3-0.3-0.6-0.4c0-0.4,0-0.9,0-1.6c0-0.4-0.1-1.8-0.1-1.9
c0-0.5-0.5-1-1-1.1l-0.8-0.1c-0.1,0-0.1,0-0.1,0c-0.2,0-0.4,0.1-0.5,0.1c-0.3-0.5-0.8-0.9-1.5-0.9c-0.2,0-0.6-0.2-0.9-0.3
c0,0,0,0-0.1,0s-0.1-0.1-0.2-0.1c-0.1-0.5-0.2-1.2-0.4-1.8v-0.1l-0.2-0.5c0.6,0,1.1-0.3,1.5-0.9c0.2-0.3,0.4-0.8,0.5-1.5
c0-0.1,0.1-0.3,0.1-0.3s0,0,0-0.1c0.1-0.2,0.5-0.9,0.1-1.7c0.2-0.3,0.4-0.5,0.5-0.9c0-0.1,0-0.2,0.1-0.3c0.2,0,0.4,0.1,0.7,0.1
c0.1,0,0.3,0,0.4,0.1c0,0.1,0.1,0.3,0.1,0.4c0,0.8,0.8,1.6,1.8,1.6c0.4,0,0.7-0.1,1.1-0.3c0.7-0.6,1.2-1.1,1.2-1.7
c0,0,0-0.1,0.1-0.1c0.1-0.3,0.4-0.9,0.3-1.5c0.3-0.1,0.5-0.3,0.7-0.5c0.3-0.3,0.4-0.8,0.3-1.3l-0.1-0.3c0.3-0.2,0.6-0.6,0.7-0.9
c0.1-0.3,0.1-0.7,0-1c0.5-0.3,0.9-1.1,0.5-2.4c0-0.1-0.1-0.3-0.1-0.4c0.5-0.7,0.7-1.2,0.7-1.2c0.1-0.3,0.1-0.6,0.1-0.8l-0.5-1.5
l0.4-0.8h0.1c0.3,0,0.6-0.1,0.8-0.3c0.3-0.3,0.4-0.7,0.3-1.1c-0.1-0.4-0.2-0.7-0.3-1c0.2,0.1,0.4,0.1,0.4,0.2
c0.5,0.3,1.1,0.5,1.8,0.6c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.2c0.1,0.3,0.1,0.5,0.1,0.5c0.1,0.4,0.4,0.8,0.8,0.9l1.1,0.3
c0.1,0,0.2,0,0.3,0c0.4,0,0.9-0.3,1.1-0.7c0.1-0.1,0.1-0.2,0.2-0.3h0.1c0.2,0,0.4-0.1,0.6-0.1c0.6,0.6,1.7,0.9,2,1
c0.2,0.1,1.2,0.3,1.8,0.3c0.8,0,1.7-0.5,2-0.7c0.1-0.1,0.3-0.2,0.4-0.4c0.1,0.1,0.1,0.2,0.2,0.3l0.4,0.4l0.1,0.4
c0,0.1,0.1,0.3,0.1,0.4c0.1,0.1,0.5,0.9,1.3,1.3c0.2,0.4,0.3,1.3,0.3,1.7h-0.1c-0.9,0.2-1.4,1.2-1.6,2.8c-0.9,0-1.6,0.8-1.6,2
l-0.1,0.8c-0.2,0.2-0.5,0.5-0.7,0.8c-0.4,0.5-0.5,1.2-0.4,1.8c-0.3,0.3-0.4,0.5-0.5,0.6s-0.3,0.1-0.5,0.2c-0.5,0.1-0.8,0.6-0.8,1.1
v0.9v0.1c0,0.3-0.1,0.9,0.3,1.6c0.2,0.3,0.5,0.7,0.8,1v0.3c0,0.3,0.1,0.7,0.4,0.9l-0.3,0.6c-0.2,0.3-0.2,0.7-0.1,1l0.2,0.5l-0.1,0.4
c-0.1,0.3-0.1,0.6,0.1,0.9l0.6,1.2l0.3,1.2c0,0.1,0.1,0.1,0.1,0.2c0,0,0.3,0.6,0.5,1c0.3,0.4,0.6,0.6,0.9,0.8l0.1,0.1
c0.2,0.2,0.4,0.4,0.6,0.6v1.3c-0.6,0.1-1,0.5-1.2,0.9s-0.2,0.9,0,1.3c-0.7,0.1-1.2,0.7-1.4,1.4c-0.1,0.6,0.1,1.1,0.6,1.5
c0,0.1,0,0.2,0,0.3s0,0.3,0,0.4s0,0.5,0.5,1.4l-1.1,1.3c-0.2,0.2-0.3,0.5-0.3,0.8c0,0.1,0,0.7,0.2,1.3c0.1,0.4,0.5,0.9,0.7,1.4
l-0.1,0.3c-0.1,0.5,0.1,1.1,0.6,1.3l0.3,0.2l0.3,0.5c0,0.1,0.1,0.1,0.1,0.2c-0.1,0.1-0.1,0.3-0.2,0.5l0,0c-0.1,0-0.1,0.1-0.1,0.1
c-0.2,0.1-0.4,0.2-0.5,0.3l0,0c-0.4,0-0.8,0.2-1.2,0.3c-0.1,0.1-0.3,0.1-0.4,0.1C189.1,155.7,189,155.7,188.9,155.8z`
  },
  {
    id: "TraVinh",
    name: "Trà Vinh",
    d: `M228.8,660.9l-0.2-0.1l-1.8-1.5c-0.1,0-0.1-0.1-0.1-0.1l-3.4-1.9l-7.4-7.1l-2.6-3.3
c0.3,0,0.6-0.1,0.8-0.4c0.2-0.2,0.4-0.4,0.5-0.5c0.2,0,0.3-0.1,0.5-0.2l0.3,0.3c0.2,0.2,0.5,0.3,0.7,0.3c0.1,0,0.1,0,0.1,0
c0.3,0,0.6-0.2,0.8-0.5l0.9-1.2c0.2-0.2,0.3-0.5,0.2-0.8l-0.1-0.5v-0.2c0.1,0,0.1,0,0.2-0.1l0.8-0.3l0.4,0.3
c0.2,0.1,0.4,0.2,0.7,0.2c0.1,0,0.2,0,0.3,0c0.8-0.2,1.6-0.9,1.5-2.1c0-0.3-0.1-0.5-0.1-0.7l1.1,0.8l0.2,0.2l0.1,0.2l0.3,0.6
c0,0.1,0.1,0.1,0.1,0.1l0.3,0.4c0,0.1,0.1,0.1,0.1,0.2l2.1,2c0.1,0.1,0.1,0.1,0.2,0.1h0.1l0.7,0.8c0.1,0.1,0.1,0.1,0.2,0.2l3.5,2.9
l0.9,1l0.6,1.1l0.3,1.5c0,0.2,0.1,0.4,0.3,0.5l0.4,0.5c0.2,0.2,0.4,0.3,0.7,0.4l0.7,0.1l0.1,0.2v0.7l-0.2,2l-0.4,1.2l-0.6,1
l-0.8,0.7l-0.6,0.4h-0.1c-0.1,0-0.1,0-0.1-0.1l-0.4-0.1c-0.1,0-0.2-0.1-0.3-0.1s-0.3,0-0.4,0.1l-0.4,0.2c-0.1,0-0.1,0.1-0.2,0.1
l-0.3,0.2L228.8,660.9z`
  },
  {
    id: "TienGiang",
    name: "Tiền Giang",
    d: `M243.3,629.9l-2.1-0.5c-0.1,0-0.2,0-0.3,0h-4.2l-2.8-0.6c-0.1,0-0.1,0-0.2,0h-1.4l-0.5-0.1
l-0.5-0.3c-0.1,0-0.1-0.1-0.2-0.1l-0.6-0.2c-0.1-0.1-0.3-0.1-0.4-0.1c-0.1,0-0.3,0-0.4,0.1l-0.6,0.2c-0.3-0.1-0.5-0.2-0.8-0.3
c-0.4-0.2-0.8-0.3-1.3-0.3c-0.9,0-1.9,0.3-2.5,0.6c-0.2,0.1-1,0.2-1.6,0.2c-0.1,0-0.2,0-0.2,0c-0.1,0-0.3,0-0.5,0
c-0.8,0-1.8,0.3-2.4,0.5c-0.5,0.2-1.6,0.4-2.1,0.5c0,0-0.1,0-0.2,0c-0.6,0-1.4-0.1-1.6-0.2c-0.5-0.3-2.1-0.7-2.4-0.8
c-0.2-0.1-0.5-0.1-0.7-0.1c-0.1,0-0.3,0-0.3,0c-0.2-0.2-0.6-0.4-1.2-0.4c-0.5,0-1.4,0.2-1.8,0.7c-0.1,0.1-0.3,0.3-0.5,0.5
c-0.3,0.3-0.6,0.6-0.8,0.7c-0.1,0.1-0.1,0.1-0.1,0.1H208h-0.1c-0.1,0-0.2,0-0.2,0h-0.1c-0.5-0.4-1.4-0.6-1.9-0.8l0,0l-0.1-0.7
c0.5,0,0.9-0.4,1.1-0.8l0.3-1.3l3.2-3.5c0.2-0.2,0.3-0.5,0.3-0.8v-0.5h0.2l4.9,0.4h0.1c0.3,0,0.5-0.1,0.8-0.3
c0.2-0.2,0.4-0.5,0.4-0.8v-1.1l5.8-0.5l0.5,0.5c0.2,0.2,0.5,0.4,0.8,0.4c0.1,0,0.2,0,0.3,0l0.2,0.2v0.2c0,0.4,0.3,0.8,0.6,1l0.1,0.1
l0.2,0.7c0.1,0.2,0.2,0.4,0.3,0.5l0.7,0.7c0.2,0.2,0.5,0.3,0.8,0.3h0.1c0.1,0,0.1,0,0.2,0c-0.1,0.1-0.1,0.2-0.2,0.3
c-0.1,0.3-0.1,0.6,0,0.9l0.4,0.9c0.2,0.4,0.6,0.7,1,0.7c0.1,0,0.1,0,0.2,0h0.1c0.2,0.3,0.6,0.5,1,0.5h0.7c0.3,0,0.5-0.1,0.8-0.3
l1.1-1c0.2,0,0.4,0.1,0.6,0.1l0,0c0.2,0.2,0.5,0.3,0.7,0.3l1.2,0.1h0.1c0.3,0,0.7-0.1,0.9-0.4c0.1-0.1,0.1-0.2,0.2-0.3
c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0l0.7-0.1c0.1,0,0.3-0.1,0.4-0.1l0.5-0.3l0.1,0.2c0.2,0.3,0.6,0.5,0.9,0.5h0.8
c0.3,0,0.5-0.1,0.7-0.3l0.3-0.3c0.1-0.1,0.2-0.2,0.2-0.3l0.2-0.4l0.2,0.5c0,0.1,0.1,0.1,0.1,0.2l0.4,0.6l0.1,0.1l0.4,0.5l0.1,0.3
L243.3,629.9L243.3,629.9L243.3,629.9z`
  },
  {
    id: "ThuaThienHue",
    name: "Thừa Thiên Huế",
    d: `M280.2,388.2l-0.7-0.6c-0.1-0.1-0.2-0.2-0.4-0.2l-0.5-0.2l0.1-0.4c0-0.4-0.1-0.8-0.4-1
c-0.2-0.2-0.5-0.3-0.7-0.3c-0.1,0-0.2,0-0.3,0.1l-1.4,0.4l-1.4,0.3c-0.5,0.1-0.9,0.7-0.9,1.2c-0.1-0.1-0.1-0.1-0.3-0.3
c-0.3-0.4-0.8-0.6-1.3-0.6c0.1-0.2,0-0.5-0.1-0.7l-0.4-0.9c-0.2-0.4-0.6-0.7-1-0.7c-0.1,0-0.2,0-0.3,0l-1.6,0.4
c-0.3,0.1-0.6,0.3-0.8,0.6l-0.1,0.2h-0.3h-0.1c-0.1,0-0.1,0-0.2,0l-1.2,0.2l-0.3-0.3l-0.7-1.5c-0.2-0.4-0.5-0.7-0.9-0.7l0,0V383
c-0.1-0.3-0.3-0.6-0.7-0.7l-0.7-0.3c-0.1-0.1-0.3-0.1-0.4-0.1c-0.2,0-0.3,0-0.5,0.1s-0.6,0.2-0.9,0.3c-0.2-0.1-0.7-0.6-1.2-1
c-0.1-0.2-0.3-0.5-0.5-0.9c0-0.2,0.2-0.5,0.3-0.7c0.5-1,0.2-2.2-0.8-2.8c-0.5-0.3-2.2-1.3-2.6-1.5c-0.2-0.1-0.4-0.1-0.5-0.1
s-0.2,0-0.3,0l-0.3,0.1c0,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0V375v-0.1v-0.3l0.9-0.5c0.4-0.2,0.7-0.7,0.6-1.2l-0.2-1.1
c0.5,0.1,0.9,0.2,1.3,0.2c0.7,0,1.2-0.3,1.4-0.6c0.7-0.9,0.3-2.4-0.4-3.2c-0.3-0.3-0.7-0.5-1.2-0.8h0.3c0.4,0,0.8-0.2,1-0.5l0.2-0.3
l2.2-0.5c0.2,0.1,0.5,0.1,0.9,0.1c0.2,0,0.3,0,0.5-0.1c0.3,0.3,0.6,0.5,0.7,0.5c0.2,0.1,0.4,0.2,0.6,0.2s0.4-0.1,0.6-0.2l2.2-1.4
c0.5-0.3,0.7-1,0.4-1.5l-0.3-0.6l0.4-0.6l0.5-0.9l0.6-0.6c0.1-0.1,0.2-0.3,0.3-0.5c0.1-0.4,0.3-0.9,0.4-1.1c0.2-0.1,0.5-0.3,0.8-0.5
l2.9,2.1l-1,0.2c-0.5,0.1-0.9,0.5-0.9,0.9c-0.1,0.5,0.1,0.9,0.6,1.2l3.1,1.8c0.1,0.1,0.2,0.1,0.3,0.1l0.9,0.2l0,0l0.1,0.2
c0.1,0.3,0.4,0.4,0.7,0.5l0.4,0.1c0.1,0,0.2,0,0.3,0c0.1,0,0.1,0,0.1,0h0.1c-0.1,0.3-0.1,0.7,0.1,1s0.5,0.5,0.9,0.5h0.6
c0,0.2,0.2,0.5,0.3,0.6c0.1,0.1,0.1,0.1,0.2,0.2c0,0.2,0.1,0.5,0.2,0.7c0.2,0.3,0.6,0.5,0.9,0.5h0.4c0.3,0,0.5-0.1,0.7-0.3l0,0
l0.1,0.1l1.4,1l0.2,0.2l0.9,1.4c0.1,0.1,0.2,0.2,0.3,0.3l0.3,0.2c-0.1,0.1-0.1,0.2-0.1,0.3l-0.1,0.3c-0.1,0.2-0.1,0.3,0,0.5l0.5,2.4
c0,0.1,0.1,0.2,0.1,0.3l0.2,0.4c0.1,0.2,0.2,0.3,0.4,0.4l0.5,0.3c0,0,0.1,0,0.1,0.1l1,0.6c0.2,0.1,0.4,0.2,0.6,0.2h0.3h0.1
c0.1,0.2,0.3,0.4,0.6,0.5c0.1,0,0.3,0.1,0.4,0.1s0.2,0,0.3,0c0.1,0,0.1,0,0.1,0c0.1,0,0.1,0,0.1,0c0.3,0,0.5-0.1,0.7-0.3l1.5-1.2
c0.1-0.1,0.1-0.1,0.2-0.2l0.2-0.3c0.1-0.2,0.2-0.3,0.2-0.5l0.3,0.2c0.1,0.1,0.3,0.1,0.4,0.2l0.9,0.2c0.1,0,0.2,0,0.3,0
c0.2,0,0.4-0.1,0.6-0.2v0.1l0.2,0.5c-0.1,0.1-0.3,0.3-0.3,0.5l-0.2,0.6c-0.1,0.3-0.1,0.7,0.1,1l0.3,0.5c0.1,0.1,0.2,0.2,0.3,0.3
c-0.1,0-0.1,0-0.2,0c-0.2-0.1-1-0.5-1.6-1c-0.2-0.2-0.5-0.3-0.7-0.3c-0.1,0-0.1,0-0.2,0c-0.3,0.1-0.6,0.2-0.8,0.5
c-0.1,0.1-0.3,0.3-0.5,0.5c-0.3-0.1-0.7-0.4-1.1-0.7c-0.2-0.2-0.5-0.3-0.7-0.3s-0.4,0.1-0.5,0.1l-1.4,0.7c-0.4,0.2-0.7,0.7-0.6,1.1
c0,0,0.1,0.5,0.1,1c-0.3,0.1-0.6,0.5-0.7,0.8l-0.2,1c-0.3,0.2-0.7,0.6-0.9,0.9c-0.1,0.2-0.3,0.4-0.3,0.6c-0.1-0.1-0.2-0.1-0.3-0.1
c-0.2-0.1-0.4-0.2-0.6-0.2c-0.1,0-0.3,0-0.4,0.1c-0.3,0.1-0.6,0.4-0.7,0.8l-0.1,0.5c-0.1,0.1-0.2,0.1-0.3,0.1
c-0.3,0-1.4,0.2-1.6,1.6C280.6,388.1,280.5,388.1,280.2,388.2C280.3,388.2,280.3,388.2,280.2,388.2z`
  },
  {
    id: "ThanhHoa",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },
  {
    id: "",
    name: "",
    d: ``
  },

];

function MapVietNam({ className }) {
  const [tooltip, setTooltip] = useState({ visible: false, name: '', x: 0, y: 0 });

  // const handleMouseOver = (event, provinceName) => {
  //   const { pageX, pageY } = event;
  //   setTooltip({
  //     visible: true,
  //     name: provinceName,
  //     x: pageX,
  //     y: pageY,
  //   });
  // };

  // const handleMouseOut = () => {
  //   setTooltip({ visible: false, name: '', x: 0, y: 0 });
  // };

  return (
    <div className={className}>
      <svg viewBox="0 0 1000 1000" className={cx('mapVietNam')}>
        {provinces.map((province) => (
          <path
            key={province.id}
            id={province.id}
            d={province.d}
            fill="#EEEEEE"
            // onMouseOver={(e) => handleMouseOver(e, province.name)}
            // onMouseOut={handleMouseOut}
            className={cx('province')}
          >
            <title>{province.name}</title>
          </path>
        ))}
      </svg>
      {/* {tooltip.visible && (
        <div
          id="tooltip"
          className={cx('tooltip')}
          style={{ left: tooltip.x + 10, top: tooltip.y + 10 }}
        >
          {tooltip.name}
        </div>
      )} */}
    </div>
  );
}

export default MapVietNam;