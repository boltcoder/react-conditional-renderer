# react-conditional-renderer
React Conditional Renderer is a higher order component (HOC) which wraps your component and conditionally renders the wrapped component in a React Redux App. 


# Installation
```
npm install react-conditional-renderer

```

# Usage
```javascript
import React from 'react';
import conditionalRenderer from 'react-conditional-renderer';


// Your Container Component which wants to be conditionally rendered
class YourContainerComponent extends React.Component {
	render() {
		//... whatever you want to render
	}
}

/** Wrap your existing component with conditional renderer higher order component.
 *
 * Accepts following arguments
 *
 * @param {React.Component} Component         Component to conditionally protect from rendering
 *
 * @param {function} options.condition Function which receives state as a parameter and allows you to provide any condition. 
 *
 * @param {function} options.onConditionSuccess Function which executes after function "condition" returns true. If undefined, then 
 * component will be rendered if condition function returns true. If defined, component will be rendered/notRendered if onConditionSuccess returns true/false correspondingly
 *
 * @param {function} options.onConditionFailure Function which executes after function "condition" returns false. If undefined, then 
 * component will not be rendered if "condition" function returns false. If defined, component will be notRendered/rendered/ if onConditionFailure returns false/true correspondingly;
 *
 * @param {Object} customParams any parameters you want available for above callbacks.
 */

 const customParams = {
 	redirectCallback: () => browserHistory.push('/'),
 }

const FinalComponent = conditionalRenderer(YourContainerComponent,
{ 
	// check if user is logged in
	condition: (state, customParams) => state.isAuthenticated === true,

	onConditionSuccess: (state, customParams) => {
		// show the page only if user is customer type
		if (state.user.type === "Customer") {
			return true;
		} else {
			return false;
		}
	},
	onConditionFailure: (state, customParams) => {
		// redirect to any page
		customParams.redirectCallback();

		// tell component to not render
		return false

	}
}, customParams);


export default FinalComponent;

```

