module FableDemo.Routes

open Elmish
open Elmish.Browser.UrlParser
open Fable.Import.Browser

type IRoute =
  | Home
  | About
  | NotFound

let routes =
  oneOf
        [ map Home (s "")
          map About (s "about")
          map NotFound (s "404") ]

let urlOfRoute route =
  match route with
  | Home -> "/"
  | About -> "/about"
  | NotFound -> "/404"

let getProperRoute (location: IRoute option) =
  match location with
  | Some r -> Some r
  | None ->
    match (parsePath routes window.location) with
    | Some r -> Some r
    | None -> None
