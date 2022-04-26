import React from "react";

import info from '../../assets/images/info.svg';
import warning from '../../assets/images/warning.svg';
import error from '../../assets/images/error.svg';
import success from '../../assets/images/success.svg';
import { Mode } from "../../types";

import styles from './styles.module.css';

interface ILogo {
  name: Mode
}

const Logo: React.FC<ILogo> = ({ name }) => {
  const images = {
    info,
    warning,
    error,
    success,
  }

  return <img className={styles.img} src={images[name]} />;
};

export default Logo;
