import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

type Props = {
  children: React.ReactNode;
  to: string;
  color: string;
};

export const LinkComponent = (props: Props) => {
  return (
    <div>
      <Link
        to={props.to}
        css={css`
          margin-top: 40px;
          color: ${props.color};
          font-size: 20px;
          text-decoration: none;
          &:hover {
            border-bottom: 6px solid ${props.color};
          }
        `}
      >
        {props.children}
      </Link>
    </div>
  );
};
