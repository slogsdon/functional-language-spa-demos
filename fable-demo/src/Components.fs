module FableDemo.Components

open Fable.Helpers.React.Props
module R = Fable.Helpers.React

let link dispatch url (text: string) =
  R.a
    [ OnClick (fun e -> e.preventDefault(); dispatch())
      Href url ]
    [ R.str text ]
