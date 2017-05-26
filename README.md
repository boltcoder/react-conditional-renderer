# react-conditional-renderer
React Conditional Renderer is a higher order component (HOC) which wraps your component and conditionally renders the wrapped component in a React Redux App. 


# Installation
```
npm install react-conditional-renderer

```

# Usage
Wrap your existing component with conditional renderer higher order component.

Accepts following arguments

## @param {React.Component} Component
The component you want to conditionally rendering

## @param {object} options 

### options.condition = (state, customParams) => {}
Function which receives state as a parameter and allows you to provide any condition. 

### options.onConditionSuccess = (state, customParams) => {}
Function which executes after function "condition" returns true. If undefined, then component will be rendered if condition function returns true. If defined, component will be rendered/notRendered if onConditionSuccess returns true/false correspondingly.

### options.onConditionFailure = (state, customParams) => {}
Function which executes after function "condition" returns false. If undefined, then component will not be rendered if "condition" function returns false. If defined, component will be notRendered/rendered/ if onConditionFailure returns false/true correspondingly;

## @param {Object} customParams 
any param you want available for callbacks 

# Example 

```javascript
import React from 'react';
import conditionalRenderer from 'react-conditional-renderer';


// Your Container Component which you want to be conditionally rendered
class YourContainerComponent extends React.Component {
	render() {
		//... whatever you want to render
	}
}

 const customParams = {
 	redirectCallback: () => browserHistory.push('/'),
 }

const FinalComponent = conditionalRenderer(YourContainerComponent,
{ 
	// eg: check if user is logged in
	condition: (state, customParams) => state.isAuthenticated === true,

	onConditionSuccess: (state, customParams) => {
		// render the component only if user is customer type
		if (state.user.type === "Customer") {
			return true;
		} else {
			// redirect to any page
			customParams.redirectCallback();
			// tell component to not render	
			return false;
		}
	},
	onConditionFailure: (state, customParams) => {
		// redirect to any page
		customParams.redirectCallback();
		// tell component to not render
		return false;
	}
}, customParams);


export default FinalComponent;

```

