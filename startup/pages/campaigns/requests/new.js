import React, { Component } from 'react';
import { Form, Button, Input, Message, TextArea } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Router, Link } from '../../../routes';
import Layout from '../../../components/Layout'

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    errorMessage : '',
    loading : false
  };

  static async getInitialProps(props){
    const {address} = props.query;
    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    const {description, value, recipient} = this.state;

    this.setState({loading: true, errorMessage : ''});
    try{
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient
      ).send({from: accounts[0]});

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    }catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading: false});
  };

  render() {
    return (
      <Layout>
        <Link route = {`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a request</h3>
        <Form onSubmit = {this.onSubmit} error= {!!this.state.errorMessage}>

          <Form.Field>
            <label>Description</label>
            <TextArea
              value = {this.state.description}
              onChange = { event =>
                this.setState({description : event.target.value})
              }
              placeholder='Tell us more'
              autoHeight
            />
          </Form.Field>

          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value = {this.state.Value}
              onChange = { event =>
                this.setState({value : event.target.value})
              }
              label = 'ether'
              labelPosition='right'
              placeholder='10'
            />
          </Form.Field>

          <Form.Field>
            <label>Recipient</label>
            <Input
              value = {this.state.recipient}
              onChange = { event =>
                this.setState({recipient : event.target.value})
              }
              label = 'address'
              labelPosition='right'
              placeholder='0xF439AFD9dB63f0a0D5eEB447712B1702D7CB4986'
            />
          </Form.Field>
          <Message error header= "Oops!" content = {this.state.errorMessage} />
          <Button  loading= {this.state.loading} primary type='submit'>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
