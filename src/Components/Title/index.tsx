import styled from 'styled-components';

interface TitleProps {
  large?: boolean;
}

const Title = styled.span<TitleProps>`
  font-size: ${p => (p.large ? '42px' : '26px')};
  font-weight: ${p => (p.large ? 600 : 200)};
  display: block;
  line-height: 1.5;
  color: #fff;
  text-align: center;
`;

Title.defaultProps = {
  large: false,
};

export default Title;
