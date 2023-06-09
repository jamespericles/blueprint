import { Button as AntdButton } from 'antd';
import React from 'react';

interface Props {
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  htmlType?: 'submit';
}

const Button: React.FunctionComponent<Props> = ({
  disabled,
  onClick,
  children,
  icon,
}) => {
  return (
    <AntdButton
      style={{
        width: '70px',
        height: '36px',
        fontSize: '14px',
        maxWidth: '100%',
        textAlign: 'center',
        padding: '0px',
        borderRadius: '10px',
        backgroundColor: 'white',
        border: 'white',
        color: 'black',
        cursor: 'pointer',
        opacity: disabled ? 0.3 : 1,
      }}
      disabled={disabled}
      icon={icon}
      onClick={onClick}>
      {children}
    </AntdButton>
  );
};

export default Button;
