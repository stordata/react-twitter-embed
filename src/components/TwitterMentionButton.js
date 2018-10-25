import React, { Component } from 'react'
import PropTypes from 'prop-types'
import script from 'scriptjs'
import twitter_widget_js from './twitter-widget-url'

export default class TwitterMentionButton extends Component {
  static propTypes = {
    /**
     * Username to which you will need to tweet
     */
    screenName: PropTypes.string.isRequired,
    /**
     * Additional options for overriding config.
     */
    options: PropTypes.object
  };

  componentDidMount() {
    script(twitter_widget_js, 'twitter-embed', () => {
      if (!window.twttr) {
        console.error('Failure to load window.twttr in TwitterMentionButton, aborting load.')
        return
      }

      if (!this.isMountCanceled) {
        window.twttr.widgets.createMentionButton(
          this.props.screenName,
          this.refs.embedContainer,
          this.props.options
        )
      }
    })
  }

  componentWillUnmount() {
    this.isMountCanceled = true
  }

  render() {
    return (
      <div ref='embedContainer' />
    )
  }
}
