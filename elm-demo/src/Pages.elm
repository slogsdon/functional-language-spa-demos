module Pages exposing (..)

import Html exposing (..)


homePage : Html msg
homePage =
    div [] [ text "Home" ]


aboutPage : Html msg
aboutPage =
    div [] [ text "About" ]


notFoundPage : Html msg
notFoundPage =
    div [] [ text "404: Not Found" ]
