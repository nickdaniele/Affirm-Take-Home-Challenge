# Affirm Take Home Challenge
Credit card challenge.

1. How long did you spend working on the problem? How much time did you spend thinking about the design before writing your code?

Roughly 2 hours. I probably spent the first 20 minutes to a half hour deciding how I was going to model the components, validate inputs, what 3rd party libraries I was going to use, etc.


2. What are the UI/UX usability features you implemented, or thought about implementing? How do they help validate the user input?

I implemented very simple regex validation for the required fields. I thought about determining which credit card type the user was using but decided to got with a radio button select instead. I thought it was more clear for the user to know what cards were accepted and it also made validation much easier.


3. What would a form submission/API payload of this look like? How would you deal with validation errors that may come from that API response?

The payload would look very much like the data structure I used for state in the app (minus the errors and submmited attributes). Validation errors returned in an API response I would probably handle with a modal initially if no design was given by UX/UI and if needed implement something a little more subtle like an error message underneath the submit button.


4. What are some styling and layout considerations for these types of form inputs?

You might want to consider usability on mobile devices depending on the usecase. You also have to aware of spacing for error messages. Over all I used a very minimal aproach and leveraged native html inputs for my form for the sake of simplicity and speed. 

I treated this project as an MVP. Future improvements I would make would be to break out the inputs into there own components, especially the radio select. I would also want to create a utility file to peform the error handling I am performing in a more compartmentalized and reusable manner. 
