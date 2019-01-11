import React, { Component } from 'react';
import { Form, Button, Input, Message, TextArea } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';


class CampaignNew extends Component {
  state = {
    minimumContribution : '',
    errorMessage : '',
    loading : false,
    description: ''
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({loading: true, errorMessage : ''});
    try{
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution, this.state.description)
        .send({
          from: accounts[0]
        });
      Router.pushRoute('/');
    }catch(err){
        this.setState({errorMessage: err.message});
    }
    this.setState({loading: false});
  };

  render () {
    return (
      <Layout>
        <h3>Create a Campaign! </h3>
        <Form onSubmit = {this.onSubmit} error= {!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <TextArea
              value = {this.state.description}
              onChange = { event =>
                this.setState({description : event.target.value})
              }
              placeholder='Tell us more about your project'
              autoHeight
          />
        </Form.Field>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label='wei'
              labelPosition='right'
              value = {this.state.minimumContribution}
              onChange = { event =>
                this.setState({minimumContribution : event.target.value})
              }
              placeholder='10000'
            />
          </Form.Field>
          <Message error header= "Oops!" content = {this.state.errorMessage} />
          <Button loading= {this.state.loading} primary type='submit'>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
