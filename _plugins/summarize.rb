module Jekyll
  module Summary
    def summarize(str, splitstr = /\s*<div id="extended">/)
      str.split(splitstr)[0]
    end
  end
end

Liquid::Template.register_filter(Jekyll::Summary)