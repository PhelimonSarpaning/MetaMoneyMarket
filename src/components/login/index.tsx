import React from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../common/Button';
import CheckboxInput from '../common/CheckboxInput';
import Metamask from '../common/img/Metamask';
import SMS from '../common/img/SMS';
import RadioInput from '../common/RadioInput';
import ModalTitle from '../modal-title';

import { modalStyle, themeColors } from '../../util/constants';

interface Props extends React.ComponentProps<typeof Modal> {}

interface State {
  termsAccepted: boolean;
  loginMethod: string;
}

const LoginItems = styled.div`
  margin-bottom: 45px;
`;

const LoginItem = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LoginItemIcon = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 50px;
`;

const LoginItemText = styled.div`
  flex-grow: 1;
  margin-right: 10px;
`;

const LoginItemTitle = styled.h3`
  color: #444;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.35;
  margin: 0;
`;

const LoginItemDescription = styled.p`
  color: #444;
  font-size: 13px;
  font-style: normal;
  line-height: 1.23;
  margin: 0;
`;

const RadioInputWrapper = styled.div`
  flex-shrink: 0;
`;

const ButtonStyled = styled(Button)`
  text-transform: uppercase;
  width: 100%;
`;

const TermsAndConditions = styled.div`
  align-content: center;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const TermsAndConditionsText = styled.span`
  color: #999;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: normal;
  line-height: 18px;
  margin-left: 10px;
  text-align: left;

  a {
    color: ${themeColors.primaryColor};
  }
`;

class LoginModal extends React.Component<Props, State> {
  public state = {
    loginMethod: 'phone',
    termsAccepted: false,
  };

  public render = () => {
    const { onRequestClose, ...restProps } = this.props;

    return (
      <Modal {...restProps} style={modalStyle}>
        <ModalTitle title="Login" onRequestClose={onRequestClose} />
        <LoginItems>
          <LoginItem onClick={() => this.setLoginMethod('phone')}>
            <LoginItemIcon>
              <SMS />
            </LoginItemIcon>
            <LoginItemText>
              <LoginItemTitle>Use your phone</LoginItemTitle>
              <LoginItemDescription>
                Get a secure wallet quickly with only your phone number and a PIN.
              </LoginItemDescription>
            </LoginItemText>
            <RadioInputWrapper>
              <RadioInput checked={this.state.loginMethod === 'phone'} />
            </RadioInputWrapper>
          </LoginItem>
          <LoginItem onClick={() => this.setLoginMethod('metamask')}>
            <LoginItemIcon>
              <Metamask />
            </LoginItemIcon>
            <LoginItemText>
              <LoginItemTitle>MetaMask</LoginItemTitle>
              <LoginItemDescription>Use this popular browser extension wallet.</LoginItemDescription>
            </LoginItemText>
            <RadioInputWrapper>
              <RadioInput checked={this.state.loginMethod === 'metamask'} />
            </RadioInputWrapper>
          </LoginItem>
        </LoginItems>
        <TermsAndConditions>
          <CheckboxInput onClick={this.toggleTerms} checked={this.state.termsAccepted} />
          <TermsAndConditionsText>
            I accept the{' '}
            <NavLink onClick={onRequestClose} to="/terms">
              Terms &amp; Conditions
            </NavLink>
          </TermsAndConditionsText>
        </TermsAndConditions>
        <ButtonStyled disabled={!this.state.termsAccepted}>Login</ButtonStyled>
      </Modal>
    );
  };

  private setLoginMethod = (method: string) => {
    this.setState({ loginMethod: method });
  };

  private toggleTerms = () => {
    this.setState({ termsAccepted: !this.state.termsAccepted });
  };
}

export default LoginModal;