/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Div_ContainerPage } from '../components/Components';
import { H3_Month } from '../components/Components';
import { css } from '@emotion/react';
import { colors, mediaSize } from '../utils/theme';
import { LinkComponent } from '../components/LinkComponent';
import { urls } from '../utils/urls';
import { useState } from 'react';
import {
  repaymentCalculator,
  paymentPrincipalAmount,
} from './repaymentCalculator';
import { Helmet } from 'react-helmet';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from 'recharts';

type BtnContentType =
  | 'chartPayment'
  | 'chartMortgage'
  | 'tablePayment'
  | 'chartPropertyValue'
  | 'chartPaymentInflation'
  | 'chartMortgageInflation';

const inflationCalc = (numWithoutInflation: number, inflation: number) => {
  return numWithoutInflation * (1 - inflation / 100 / 12);
};

const propertyValueInflationCalc = (
  numWithoutInflation: number,
  inflation: number
) => {
  return numWithoutInflation * (1 + inflation / 100 / 12);
};

const amortizationCalc = (arg: {
  index: number;
  interestRate: number;
  months: number;
  howMuch: number;
}) => {
  return paymentPrincipalAmount({
    rate: arg.interestRate / 100 / 12,
    period: arg.index + 1,
    months: arg.months,
    presentValue: arg.howMuch,
  });
};

const mortgageDataCalculator = (arg: {
  howMuch: number;
  interestRate: number;
  months: number;
  inflation: number;
}) => {
  const firstPayment = repaymentCalculator(
    arg.howMuch,
    arg.interestRate,
    arg.months
  );
  const monthsArr: number[] =
    arg.howMuch && arg.interestRate && arg.months
      ? Array.from(Array(arg.months).keys())
      : [];
  let restMortgage = arg.howMuch;
  let payment = firstPayment;
  let paymentInflation = firstPayment;
  let propertyValue = arg.howMuch;

  const paymentsArr = monthsArr.map((period, index) => {
    const interestRate = arg.interestRate;
    const months = arg.months;
    const howMuch = arg.howMuch;
    const amortization = amortizationCalc({
      index,
      interestRate,
      months,
      howMuch,
    });

    restMortgage -= amortization;
    let mortgageValueInflation = restMortgage;
    let amortizationInflation = amortization;

    amortizationInflation = inflationCalc(amortization, arg.inflation);
    paymentInflation = inflationCalc(paymentInflation, arg.inflation);
    mortgageValueInflation = inflationCalc(restMortgage, arg.inflation);
    propertyValue = propertyValueInflationCalc(propertyValue, arg.inflation);

    return {
      period: index,
      year: Math.floor(index / 12) + 1,
      month: (index % 12) + 1,
      payment: firstPayment,
      paymentInflation: Math.floor(paymentInflation),
      amortization: Math.floor(amortization),
      amortizationInflation: Math.floor(amortizationInflation),
      interest: Math.floor(payment - amortization),
      interestInflation: Math.floor(paymentInflation - amortizationInflation),
      mortgageValue: Math.ceil(restMortgage),
      mortgageValueInflation: Math.ceil(
        inflationCalc(restMortgage, arg.inflation)
      ),
      propertyValue: Math.ceil(propertyValue),
    };
  });
  return paymentsArr;
};

export const MortgageCalculator = () => {
  const [howMuch, setHowMuch] = useState(1000000);
  const [interestRate, setInterestRate] = useState(5);
  const [months, setMonths] = useState(120);
  const [inflation, setInflation] = useState(3);
  const [contentHandler, setContentHandler] = useState(
    'chartPayment' as BtnContentType
  );

  const payment = repaymentCalculator(howMuch, interestRate, months);
  const paymentsArr = mortgageDataCalculator({
    howMuch,
    interestRate,
    months,
    inflation,
  });

  const deleteForm = () => {
    setHowMuch(0);
    setInterestRate(0);
    setMonths(0);
  };

  return (
    <Div_Container_Mortgage>
      <Helmet>
        <title>AD - Mortgage Calculator</title>
      </Helmet>
      <Div_Header>
        <H3_Month
          css={css`
            padding-top: 0;
          `}
        >
          Mortgage Calculator
        </H3_Month>
      </Div_Header>

      <Div_Sidebar>
        <form
          onReset={deleteForm}
          css={css`
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
          `}
        >
          <Label_Styled>Mortgage CZK</Label_Styled>
          <Input_Styled
            type='text'
            placeholder={'I would like to loan:'}
            maxLength={8}
            value={howMuch > 0 ? howMuch : ''}
            onChange={(event) => {
              setHowMuch(parseInt(event.target.value));
            }}
          />
          <Label_Styled>Interest Rate %</Label_Styled>
          <Input_Styled
            title='Interest Rate in %'
            type='text'
            placeholder='5.3'
            maxLength={4}
            value={interestRate > 0 ? interestRate : ''}
            onChange={(event) => {
              setInterestRate(parseFloat(event.target.value));
            }}
          />
          <Label_Styled>Years</Label_Styled>
          <Input_Styled
            type='text'
            placeholder='Loan Term in Years'
            value={months > 0 ? months / 12 : ''}
            onChange={(event) =>
              setMonths(
                event.target.value === ''
                  ? 0
                  : parseInt(event.target.value) * 12
              )
            }
          />
          <Label_Styled>Inflation %</Label_Styled>
          <Input_Styled
            title='Inflation Rate in %'
            type='text'
            placeholder='5.3'
            maxLength={4}
            value={inflation > 0 ? inflation : ''}
            onChange={(event) => {
              setInflation(parseFloat(event.target.value));
            }}
          />

          {!payment || !isFinite(payment) ? (
            <Div_Result>Monthly Payment</Div_Result>
          ) : (
            <Div_Result>{payment} CZK</Div_Result>
          )}

          <div
            css={css`
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
            `}
          >
            <Btn_Chart
              type='button'
              onClick={() => setContentHandler('tablePayment')}
              isActive={contentHandler === 'tablePayment'}
            >
              Table
            </Btn_Chart>
            <Btn_Chart
              type='button'
              onClick={() => setContentHandler('chartPayment')}
              isActive={contentHandler === 'chartPayment'}
            >
              Payment Chart
            </Btn_Chart>
            <Btn_Chart
              type='button'
              onClick={() => setContentHandler('chartMortgage')}
              isActive={contentHandler === 'chartMortgage'}
            >
              Mortgage Chart
            </Btn_Chart>
            <Btn_Chart
              type='button'
              onClick={() => setContentHandler('chartPropertyValue')}
              isActive={contentHandler === 'chartPropertyValue'}
            >
              Property Value Chart
            </Btn_Chart>
            <Btn_Chart
              type='button'
              onClick={() => setContentHandler('chartPaymentInflation')}
              isActive={contentHandler === 'chartPaymentInflation'}
            >
              Inflation Payment Chart
            </Btn_Chart>
            <Btn_Chart
              type='button'
              onClick={() => setContentHandler('chartMortgageInflation')}
              isActive={contentHandler === 'chartMortgageInflation'}
            >
              Inflation Mortgage Chart
            </Btn_Chart>
          </div>

          <Btn_Styled type='reset'>Clear Form</Btn_Styled>
        </form>
        <LinkComponent to={urls.mainpage} color={colors.highlight}>
          GO HOME
        </LinkComponent>
      </Div_Sidebar>

      {interestRate !== 0 && months !== 0 && howMuch !== 0 && (
        <Div_Content>
          {contentHandler === 'chartPayment' && (
            <ChartPayment paymentChartData={paymentsArr} />
          )}
          {contentHandler === 'chartPaymentInflation' && (
            <ChartPaymentInflation paymentChartData={paymentsArr} />
          )}
          {contentHandler === 'chartMortgage' && (
            <ChartMortgage paymentChartData={paymentsArr} />
          )}
          {contentHandler === 'chartMortgageInflation' && (
            <ChartMortgageInflation paymentChartData={paymentsArr} />
          )}
          {contentHandler === 'tablePayment' && (
            <Table_Styled>
              <thead>
                <tr>
                  <Th_Styled>Year</Th_Styled>
                  <Th_Styled>Month</Th_Styled>
                  <Th_Styled>Payment</Th_Styled>
                  <Th_Styled>Amortization</Th_Styled>
                  <Th_Styled>Interest</Th_Styled>
                  <Th_Styled>Mortgage</Th_Styled>
                </tr>
              </thead>
              <tbody>
                {paymentsArr.map((payment) => (
                  <tr key={payment.period}>
                    <Td_Styled>{payment.year}</Td_Styled>
                    <Td_Styled>{payment.month}</Td_Styled>
                    <Td_Styled>{payment.payment}</Td_Styled>
                    <Td_Styled>{payment.amortization}</Td_Styled>
                    <Td_Styled>{payment.interest}</Td_Styled>
                    <Td_Styled>{payment.mortgageValue}</Td_Styled>
                  </tr>
                ))}
              </tbody>
            </Table_Styled>
          )}

          {contentHandler === 'chartPropertyValue' && (
            <ChartPropertyValue paymentChartData={paymentsArr} />
          )}
        </Div_Content>
      )}
    </Div_Container_Mortgage>
  );
};

type ChartData = {
  period: number;
  year: number;
  month: number;
  payment: number;
  paymentInflation: number;
  amortization: number;
  amortizationInflation: number;
  interest: number;
  interestInflation: number;
  mortgageValue: number;
  mortgageValueInflation: number;
  propertyValue: number;
};

type ChartProps = {
  paymentChartData: ChartData[];
};

const ChartPayment = (props: ChartProps) => {
  return (
    <ResponsiveContainer width='90%' aspect={1 / 0.7}>
      <LineChart>
        <CartesianGrid strokeDasharray='2 7' stroke={colors.secondaryDarker} />
        <XAxis
          dataKey='period'
          domain={['0', 'auto']}
          xAxisId={'benchmark'}
          stroke={colors.secondaryDarker}
          dy={5}
          label={{
            value: 'Months',
            fill: 'whitesmoke',
            dy: -30,
          }}
        />
        <XAxis hide={true} dataKey='x' xAxisId={'value'} />
        <YAxis
          domain={['0', 'auto']}
          width={3}
          orientation='right'
          stroke={colors.secondaryDarker}
          tickCount={8}
          textAnchor='end'
          dy={10}
          dx={-15}
          label={{
            value: 'CZK',
            fill: 'whitesmoke',
            angle: -90,
            dx: -20,
          }}
        />
        <Legend />
        <Tooltip contentStyle={{ backgroundColor: colors.primary }} />
        <Line
          xAxisId={'benchmark'}
          type='monotone'
          data={props.paymentChartData}
          dataKey='amortization'
          stroke={colors.highlight}
          name='amortization'
        />
        <Line
          xAxisId={'value'}
          type='monotone'
          data={props.paymentChartData}
          dataKey='interest'
          stroke={colors.secondary}
          name='interest'
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const ChartPaymentInflation = (props: ChartProps) => {
  return (
    <ResponsiveContainer width='90%' aspect={1 / 0.7}>
      <LineChart>
        <CartesianGrid strokeDasharray='2 7' stroke={colors.secondaryDarker} />
        <XAxis
          dataKey='period'
          domain={['0', 'auto']}
          xAxisId={'benchmark'}
          stroke={colors.secondaryDarker}
          dy={5}
          label={{
            value: 'Months',
            fill: 'whitesmoke',
            dy: -30,
          }}
        />
        <XAxis hide={true} dataKey='x' xAxisId={'value'} />
        <YAxis
          domain={['0', 'auto']}
          width={3}
          orientation='right'
          stroke={colors.secondaryDarker}
          tickCount={8}
          textAnchor='end'
          dy={10}
          dx={-15}
          label={{
            value: 'CZK',
            fill: 'whitesmoke',
            angle: -90,
            dx: -20,
          }}
        />
        <Legend />
        <Tooltip contentStyle={{ backgroundColor: colors.primary }} />
        <Line
          xAxisId={'benchmark'}
          type='monotone'
          data={props.paymentChartData}
          dataKey='amortizationInflation'
          stroke={colors.highlight}
          name='amortization'
        />
        <Line
          xAxisId={'value'}
          type='monotone'
          data={props.paymentChartData}
          dataKey='interestInflation'
          stroke={colors.secondary}
          name='interest'
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const ChartMortgage = (props: ChartProps) => {
  return (
    <ResponsiveContainer width='90%' aspect={1 / 0.7}>
      <LineChart>
        <CartesianGrid strokeDasharray='2 7' stroke={colors.secondaryDarker} />
        <XAxis
          dataKey='period'
          domain={['0', 'auto']}
          stroke={colors.secondaryDarker}
          dy={5}
          label={{
            value: 'Months',
            fill: 'whitesmoke',
            dy: -30,
          }}
        />

        <YAxis
          domain={['0', 'auto']}
          width={3}
          orientation='right'
          stroke={colors.secondaryDarker}
          tickCount={8}
          textAnchor='end'
          dy={10}
          dx={-15}
          label={{
            value: 'CZK',
            fill: 'whitesmoke',
            angle: -90,
            dx: -20,
          }}
        />
        <Legend />
        <Tooltip contentStyle={{ backgroundColor: colors.primary }} />
        <Line
          type='monotone'
          data={props.paymentChartData}
          dataKey='mortgageValue'
          stroke={colors.highlight}
          name='Mortgage'
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const ChartMortgageInflation = (props: ChartProps) => {
  return (
    <ResponsiveContainer width='90%' aspect={1 / 0.7}>
      <LineChart>
        <CartesianGrid strokeDasharray='2 7' stroke={colors.secondaryDarker} />
        <XAxis
          dataKey='period'
          domain={['0', 'auto']}
          stroke={colors.secondaryDarker}
          dy={5}
          label={{
            value: 'Months',
            fill: 'whitesmoke',
            dy: -30,
          }}
        />

        <YAxis
          domain={['0', 'auto']}
          width={3}
          orientation='right'
          stroke={colors.secondaryDarker}
          tickCount={8}
          textAnchor='end'
          dy={10}
          dx={-15}
          label={{
            value: 'CZK',
            fill: 'whitesmoke',
            angle: -90,
            dx: -20,
          }}
        />
        <Legend />
        <Tooltip contentStyle={{ backgroundColor: colors.primary }} />
        <Line
          type='monotone'
          data={props.paymentChartData}
          dataKey='mortgageValueInflation'
          stroke={colors.highlight}
          name='Mortgage'
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const ChartPropertyValue = (props: ChartProps) => {
  return (
    <ResponsiveContainer width='90%' aspect={1 / 0.7}>
      <LineChart>
        <CartesianGrid strokeDasharray='2 7' stroke={colors.secondaryDarker} />
        <XAxis
          dataKey='period'
          domain={['0', 'auto']}
          stroke={colors.secondaryDarker}
          dy={5}
          label={{
            value: 'Months',
            fill: 'whitesmoke',
            dy: -30,
          }}
        />

        <YAxis
          domain={['0', 'auto']}
          width={3}
          orientation='right'
          stroke={colors.secondaryDarker}
          tickCount={8}
          textAnchor='end'
          dy={10}
          dx={-15}
          label={{
            value: 'CZK',
            fill: colors.secondary,
            angle: -90,
            dx: -20,
          }}
        />
        <Legend />
        <Tooltip contentStyle={{ backgroundColor: colors.primary }} />
        <Line
          type='monotone'
          data={props.paymentChartData}
          dataKey='propertyValue'
          stroke={colors.highlight}
          name='Mortgage'
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Div_Container_Mortgage = styled(Div_ContainerPage)`
  @media (${mediaSize.mediaMobile}) {
    grid-template-areas:
      'header'
      'sidebar'
      'content';
  }
  @media (${mediaSize.mediaLaptop}) {
    display: grid;
    grid-template-areas: 'sidebar', 'content', 'header';
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
      'header header'
      'sidebar content';
  }

  align-items: center;
`;

const Div_Header = styled.header`
  grid-area: header;
  height: 70px;
`;

const Div_Sidebar = styled.div`
  @media (${mediaSize.mediaMobile}) {
    margin-bottom: 15px;
    border-bottom: solid 2px ${colors.secondary};
    padding-bottom: 25px;
    margin: 0 auto;
  }

  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 270px;
  height: 100%;
`;

const Div_Content = styled.div`
  @media (${mediaSize.mediaMobile}) {
    width: 100%;
  }

  grid-area: content;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 12px;
`;

const Input_Styled = styled.input`
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 300px;
  }

  height: 50px;
  background-color: ${colors.primary};
  color: ${colors.secondary};
  border: none;
  /* border-top: solid 2px ${colors.secondary}; */
  border-bottom: solid 2px ${colors.secondary};
  text-align: center;
  font-size: 25px;
  margin: 10px;
  &:focus {
    outline: none;
    border-width: 5px;
    border-color: ${colors.secondary};
  }
`;
const Label_Styled = styled.label`
  color: ${colors.highlight};
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: -10px;
`;

const Div_Result = styled.div`
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 300px;
  }
  color: ${colors.highlight};
  background-color: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border: solid 2px ${colors.highlight};
  border-radius: 20px;

  height: 50px;
  font-size: 25px;
`;

const Btn_Styled = styled.button`
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 300px;
  }
  height: 50px;
  margin: 10px;
  background-color: ${colors.primary};
  color: ${colors.secondary};
  border: solid 2px ${colors.secondary};
  border-radius: 20px;
  text-align: center;
  font-size: 25px;
  &:active {
    border: 5px solid ${colors.secondary};
  }
  &:hover {
    border-color: ${colors.highlight};
  }
`;

const Table_Styled = styled.table`
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
  }
  margin-top: 5px;
  border-collapse: separate;
  border: solid 2px ${colors.secondary};
  border-radius: 5px;
  width: 90%;
  text-align: center;
`;

const Td_Styled = styled.td`
  color: ${colors.secondary};
  font-weight: 400;
  padding: 3px;
`;
const Th_Styled = styled.th`
  @media (${mediaSize.mediaMobile}) {
    max-width: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  color: ${colors.primary};
  background-color: ${colors.highlight};
  border-radius: 3px;
  padding: 3px;
`;

type Props_Btn_Chart = {
  isActive: boolean;
};

const Btn_Chart = styled.button<Props_Btn_Chart>`
  height: 85px;
  width: 85px;
  background-color: ${colors.primary};
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) =>
    props.isActive ? colors.highlight : colors.secondary};
  border-radius: 20px;
  margin: 10px;
  font-size: 14px;

  color: ${colors.secondary};
  &:active {
    border: 5px solid ${colors.secondary};
  }
  &:hover {
    border-color: ${colors.highlight};
  }
`;
