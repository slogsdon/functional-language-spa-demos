module Routes exposing (..)

import Navigation
import UrlParser exposing (Parser, map, oneOf, s, top)


type Page
    = Home
    | About
    | NotFound


routes : Parser (Page -> a) a
routes =
    oneOf
        [ map Home top
        , map About (s "about")
        , map NotFound (s "404")
        ]


urlOfPage : Page -> String
urlOfPage page =
    case page of
        Home ->
            "/"

        About ->
            "/about"

        NotFound ->
            "/404"


pageOfLocation : Navigation.Location -> Page
pageOfLocation location =
    case UrlParser.parsePath routes location of
        Just page ->
            page

        Nothing ->
            NotFound
