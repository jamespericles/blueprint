import * as React from 'react';
import { Row } from 'antd';
import Title from '../Title';
import Card from '../Card';

interface TitleCardProps {
  fullName: string;
  disorder: string;
}

const TitleCard = ({ fullName, disorder }: TitleCardProps) => {
  return (
    <Card>
      <Row>
        <Title large>{fullName}</Title>
      </Row>
      <Row>
        <Title>Disorder: {disorder}</Title>
      </Row>
      <Row>
        <p
          style={{
            lineHeight: '28px',
            fontSize: '18px',
            color: '#fff',
            textAlign: 'center',
            marginLeft: '12%',
            marginRight: '12%',
          }}>
          Hello and thank you for continuing your mental health journey with
          Blueprint! Below there are several questions your health care provider
          has asked that you complete in order to assess how you are feeling
          this past week. Please answer them to the best of your ability.
        </p>
      </Row>
    </Card>
  );
};

export default TitleCard;
