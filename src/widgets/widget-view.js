var cdb = require('cartodb.js')
var WidgetLoaderView = require('./standard/widget-loader-view')
var WidgetErrorView = require('./standard/widget-error-view')

/**
 * Default widget view
 * The model is a expected to be widget model
 */
module.exports = cdb.core.View.extend({
  className: 'CDB-Widget CDB-Widget--light',

  options: {
    columns_title: [],
    sync: true
  },

  initialize: function () {
    this.model.layer.bind('change:visible', this._onChangeLayerVisible, this)
  },

  render: function () {
    this._loader = new WidgetLoaderView({
      model: this.model
    })
    this.$el.append(this._loader.render().el)
    this.addView(this._loader)

    this._error = new WidgetErrorView({
      model: this.model
    })
    this.$el.append(this._error.render().el)
    this.addView(this._error)

    var contentView = this.options.contentView
    this.$el.append(contentView.render().el)
    this.addView(contentView)

    return this
  },

  _onChangeLayerVisible: function (layer) {
    // !! to force a boolean value, so only a true value actually shows the view
    this.$el.toggle(!!layer.get('visible'))
  }
})
