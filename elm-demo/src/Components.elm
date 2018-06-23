module Components exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (defaultOptions, onWithOptions)
import Json.Decode as Json
import Routes exposing (..)
import Types exposing (..)


onClickPreventDefault : Msg -> Attribute Msg
onClickPreventDefault msg =
    onWithOptions
        "click"
        { defaultOptions | preventDefault = True }
        (Json.succeed msg)


link : Page -> String -> Html Msg
link page label =
    a [ href (urlOfPage page), onClickPreventDefault (FollowLink page) ] [ text label ]
