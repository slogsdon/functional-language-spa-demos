module FableDemo.Main

open Elmish
open Elmish.Browser.Navigation
open Elmish.Browser.UrlParser
open Elmish.HMR
open Elmish.React
module R = Fable.Helpers.React

open FableDemo.Components
open FableDemo.Pages
open FableDemo.Routes

// Let's define our model

type Model =
  { count: int
    route: IRoute }

type Msg =
  | FollowLink of IRoute

// Define routes

// Handle our state initialization and updates

let urlUpdate result model =
  match getProperRoute result with
  | Some page ->
      { model with route = page }, Cmd.none

  | None ->
      ( model, Navigation.newUrl "/404" ) // no matching route - go home

let init (location: IRoute option) =
  urlUpdate location { count = 0; route = Home }

let update (msg: Msg) model =
  match msg with
  | FollowLink route -> { model with route = route }, (Navigation.newUrl <| urlOfRoute route)

// Rendering views with React

let view model dispatch =
  R.div []
    [ R.nav []
        [ link (fun () -> dispatch <| FollowLink Home) (urlOfRoute Home) "Home"
          link (fun () -> dispatch <| FollowLink About) (urlOfRoute About) "About" ]

      (match model.route with
       | Home -> homePage
       | About -> aboutPage
       | NotFound -> notFoundPage)
    ]

// Create the program instance

Program.mkProgram init update view
|> Program.toNavigable (parseHash routes) urlUpdate
#if DEBUG
|> Program.withHMR
#endif
|> Program.withReact "root"
|> Program.run
