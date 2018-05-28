# allbuy
An Amazon clone created with React.js.

  This app aims to emulate a shopping site or Amazon. It allows users to look through the catalog of items, ranging in 3 categories, Apparel, Games and Toys. Like most sites, it allows users to pick the size, quantity, and platform of the item, depending on which category they fall under. The items can be added to a carat and they checked out.
   
   All the information displayed on the app is stored using Google's Firebase servers. The items name, image, quantity, size, etc are all stored on the server. When items are added to the cart, it is also stored on the server, but only temporarily. When checked out, the items are moved to another node on the server while the cart items are deleted.
      
   The app also allows users to create an account. This is also done using the Firebase servers. Users will only be able to checkout if logged in. This is done so that when the user look at their orders, only the orders attached to the account is displayed.
   
The app can be used at https://jwong421.github.io/allbuy
