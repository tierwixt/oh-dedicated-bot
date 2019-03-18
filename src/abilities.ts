import { Ability } from 'wolf-core';
import { IConversationData } from './bot';

export default [
{
    name: 'formFill',
    slots: [{
        name: 'name',
        query: () => 'What\'s your name?',
        validate: () => ({isValid: true, reason: null}),
        retry: () => '',
        onFill: (submittedValue) => { return `Got it ${submittedValue}. Let's move on to the rest.`},
    },
    {
        name: 'customer',
        query: () => 'What is the customer name?',
        validate: () => ({isValid: true, reason: null}),
        retry: () => '',
        onFill: (submittedValue) => { return `Got the customer: ${submittedValue}.`},
    },
    {
        name: 'tpid',
        query: () => `Please input the customer TPID`,
        validate: () => ({isValid: true, reason: null}),
        retry: () => '',
        onFill: (submittedValue) => { return `Got the TPID: ${submittedValue}.`}
    },
    {
        name: 'industry',
        query: () => 'What is the Industry? (Automotive, Education, Financial Services, Government, Health, Manufacturing, Media & Comms, Retail, Other Commercial Industry)',
        validate: () => ({isValid: true, reason: null}),
        retry: () => '',
        onFill: (submittedValue) => { return `Got the industry: ${submittedValue}.`}
    },
    {
        name: 'theme',
        query: () => `Select an OpenHack topics: Containers, IoT + Data, Machine Learning, Serverless, Conversational AI, Enterprise Dev + Business Apps, DevOps, Modern Data Warehousing`,
        validate: () => ({isValid: true, reason: null}),
        retry: () => '',
        onFill: (submittedValue) => { return `Got the requested topic: ${submittedValue}.`}
    },
    {
        name: 'experience',
        query: () => `Have you attended an OpenHack as an attendee or coach?`,
        validate: () => ({isValid: true, reason: null}),
        retry: () => '',
        onFill: (submittedValue) => { return `Confirmed your experience: ${submittedValue}.`}
    },
    {
        name: 'location',
        query: () => `Please enter the location of this engagement.`,
        validate: () => ({isValid: true, reason: null}),
        retry: () => '',
        onFill: (submittedValue) => { return `Got the location: ${submittedValue}.`}
    },
    {
        name: 'date',
        query: () => `Please enter the estimated date for this OpenHack.`,
        validate: () => ({isValid: true, reason: null}),
        retry: () => '',
        onFill: (submittedValue) => { return `Got the date: ${submittedValue}.`}
    },
    {
        name: 'support',
        query: () => `Who will be supporting this OpenHack, both CSE and non-CSE? Participation from the account team is required; add the names of people who would be a part of this project with us (Ex: AE, ATS, Customer Success – CSA or GBB, Digital Advisor).`,
        validate: () => ({isValid: true, reason: null}),
        retry: () => '',
        onFill: (submittedValue) => { return `Recorded the supporting team: ${submittedValue}.`}
    },
    {
        name: 'custcommit',
        query: () => `How many devs is the customer committing to the OpenHack?`,
        validate: () => ({isValid: true, reason: null}),
        retry: () => '',
        onFill: (submittedValue) => { return `Got the number of devs: ${submittedValue}.`}
    },
    {
        name: 'ado',
        query: () => `Please enter the Azure DevOps link aligned to this project if available.`,
        validate: () => ({isValid: true, reason: null}),
        retry: () => '',
        onFill: (submittedValue) => { return `Got the link: ${submittedValue}.`}
    },
    {
        name: 'stratcust',
        query: () => `What is the strategic importance to the customer? Consider: is it considered as a learning engagement, or readiness for upcoming projects? If upcoming project, does the customer have executive sponsorship for the project?`,
        validate: () => ({isValid: true, reason: null}),
        retry: () => '',
        onFill: (submittedValue) => { return `Thank you for the information about the strategic importance to the customer.`}
    },
    {
        name: 'stratmsft',
        query: () => `What is the strategic importance to the Microsoft? Consider: how important is this project to Microsoft based on the level of support from internal partners and/or interesting new scenario, new tech, strategy, unblock opportunity, etc.?`,
        validate: () => ({isValid: true, reason: null}),
        retry: () => '',
        onFill: (submittedValue) => { return `Thank you for the information about the strategic importance to Microsoft.`}
    },
    {
        name: 'impact',
        query: () => `What is the projected ACR (ACR from specific workloads)? Expected project pipeline? Likelihood something will go into production as a result of this engagement (within 6 months). If this is a request for multiple hacks, please add more info here`,
        validate: () => ({isValid: true, reason: null}),
        retry: () => '',
        onFill: (submittedValue) => { return `Thank you for the information about ACR.`}
    },
    ],
    onComplete: (convoState, submittedData) => {
        convoState.name = submittedData.name;
        return `Great ${submittedData.name}! Thanks for your submission for ${submittedData.customer}. Our team will reach out to you soon.`
    },
},
{
    name: 'greet',
    slots: [], 
    onComplete: () => {
        return 'Hi. Welcome to the OpenHack Dedicated Request Bot. Tell me about the OpenHack you want to nominate.'
    }

},
] as Ability<IConversationData>[];