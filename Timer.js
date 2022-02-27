/*

TIMER V1.0 for Framer
A component for subtle and natural random variation
MIT License

// The MIT License

Copyright (c) 2021 Yann Bellot, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

import { addPropertyControls, ControlType } from "framer"

export default function Timer(props) {
    // Define local date
    let dateNow = Date.now()

    // Define local time zone of device
    let theDate = new Date()
    let localTimeZone = (theDate.getTimezoneOffset() / 60) * -1
    if (props.timeZoneToggle === true) {
        props.timeZone = localTimeZone
    }

    // Define beginning date of timer
    let fromDateTime
    if (props.timeZone > 9) {
        fromDateTime =
            props.fromDate +
            "T" +
            props.fromTime +
            ".000+" +
            props.timeZone +
            ":00"
    }
    if (props.timeZone < 10 && props.timeZone > -1) {
        fromDateTime =
            props.fromDate +
            "T" +
            props.fromTime +
            ".000+0" +
            props.timeZone +
            ":00"
    }
    if (props.timeZone < 0 && props.timeZone >= -9) {
        fromDateTime =
            props.fromDate +
            "T" +
            props.fromTime +
            ".000-0" +
            -props.timeZone +
            ":00"
    }
    if (props.timeZone < -9) {
        fromDateTime =
            props.fromDate +
            "T" +
            props.fromTime +
            ".000-" +
            -props.timeZone +
            ":00"
    }
    let fromDateTimeParse = Date.parse(fromDateTime)

    // Define end date of timer
    let toDateTime
    if (props.timeZone > 9) {
        toDateTime =
            props.toDate + "T" + props.toTime + ".000+" + props.timeZone + ":00"
    }
    if (props.timeZone < 10 && props.timeZone > -1) {
        toDateTime =
            props.toDate +
            "T" +
            props.toTime +
            ".000+0" +
            props.timeZone +
            ":00"
    }
    if (props.timeZone < 0 && props.timeZone >= -9) {
        toDateTime =
            props.toDate +
            "T" +
            props.toTime +
            ".000-0" +
            -props.timeZone +
            ":00"
    }
    if (props.timeZone < -9) {
        toDateTime =
            props.toDate +
            "T" +
            props.toTime +
            ".000-" +
            -props.timeZone +
            ":00"
    }
    let toDateTimeParse = Date.parse(toDateTime)

    // Define CSS styles of alert messages
    const welcomeStyles = {
        backgroundColor: "#EEE",
        color: "#9966FE",
        fontSize: "large",
        padding: "20px",
        border: "2px #9966FE solid",
        borderRadius: "8px",
        width: "500px",
    }

    // Define message to use Timer
    const welcomeMessage = (
        <div style={welcomeStyles}>
            <h2>Timer</h2>
            <p>
                <strong>
                    Timer allows content to be displayed on a page over a given
                    period : between a start and end date.
                </strong>
            </p>
            <h3>To use the Timer :</h3>
            <ul>
                <li>Connect the component to a Child Frame.</li>
                <li>
                    Choose in 'From: date' and 'From: time' when the frame will
                    be displayed.
                </li>
                <li>
                    Choose in 'End: date' and 'End: time' for the end of the
                    display.
                </li>
                <li>
                    In 'Time zone', if you select 'Auto', the broadcast time
                    will be the one of the time zone where the user is located.
                </li>
                <li>
                    If you select 'Define' in 'Time zone', you can choose a time
                    zone set in 'GMT'.
                </li>
                <li>
                    Select 'Preview' in 'Mode' if you want to see the child
                    frame outside of its display time (so you don't design
                    blind). If you choose 'Play', the child frame will only be
                    displayed during its display time.
                </li>
            </ul>
        </div>
    )

    // Returns Timer
    if (props.showChildren === true) {
        return <div>{props.children}</div>
    }
    if (props.children == false) {
        return welcomeMessage
    }
    if (fromDateTimeParse < toDateTimeParse) {
        if (fromDateTimeParse > dateNow || toDateTimeParse < dateNow) {
            console.log("No content to display")
            return <></>
        }
        if (fromDateTimeParse <= dateNow && toDateTimeParse > dateNow) {
            return <div>{props.children}</div>
            console.log("The content is displaying")
        }
        if (toDateTimeParse < dateNow) {
            return <></>
            console.log("Please note that the end date has already passed.")
        }
    } else {
        return welcomeMessage
    }
}

// Property Controls
addPropertyControls(Timer, {
    children: {
        type: ControlType.ComponentInstance,
    },
    timeZoneToggle: {
        type: ControlType.Boolean,
        title: "Time zone",
        defaultValue: true,
        enabledTitle: "Auto",
        disabledTitle: "Define",
    },
    timeZone: {
        title: "GMT",
        type: ControlType.Number,
        min: -12,
        max: 12,
        defaultValue: 0,
        hidden(props) {
            return props.timeZoneToggle === true
        },
    },
    fromDate: {
        title: "From: date",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "2022-01-01",
    },
    fromTime: {
        title: "From: time",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "00:00:00",
    },
    toDate: {
        title: "To: date",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "2022-12-31",
    },
    toTime: {
        title: "To: time",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "00:00:00",
    },
    showChildren: {
        type: ControlType.Boolean,
        title: "Mode",
        defaultValue: false,
        enabledTitle: "Preview",
        disabledTitle: "Play",
    },
})
