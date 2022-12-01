# Development

### Link to Deployed Website
If you used the stencil code, this is `https://sleepykoala727.github.io/development`

### Goal and Value of the Application
The goal and value of this application is to be a shopping page for an 
artist's work. Users will be able to browse pieces, sort by size, price, and sort by price.

### Usability Principles Considered
I put the filtering and sorting tools at the top, separated from the content and cart via a horizontal line to denote the difference in functionality. The Cart is also on the right side while the content is on the left side and in a different color so there is a difference in usability.

### Organization of Components + How Data is Passed Down Through Components
Each Art Piece is it's own component as well as the Cart. The Art Piece gets passed into it all the info from the json file, including name description, price, image file, and size. The cart gets passed in the list of items in the cart and the total cost of the items in the cart.

### How the User Triggers State Changes
When the user click to add/remove to/from cart, that updates the cart state and the total state. When the user clicks the filtering/sorting checkboxes, that updates the boolean states that are used to filter and sort before rendering the art pieces.
