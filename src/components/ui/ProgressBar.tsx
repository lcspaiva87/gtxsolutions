import Icon from "@/components//ui/icons/Icon";
import Link from "next/link";
import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface IProgressBar {
  value: number;
}

function ProgressBar({ value }: IProgressBar) {
  return (
    <CircularProgressbar value={value} text={`${value}%`} />
  );
}

export default ProgressBar;
