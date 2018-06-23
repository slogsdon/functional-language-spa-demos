module FableDemo.Pages

open Fable.Helpers.React.Props
module R = Fable.Helpers.React

let homePage = R.div [] [ R.str "Home" ]
let aboutPage = R.div [] [ R.str "About" ]
let notFoundPage = R.div [] [ R.str "Not Found" ]
