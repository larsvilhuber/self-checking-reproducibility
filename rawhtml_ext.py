"""Custom Sphinx extension providing an inline raw HTML role.

Usage in MyST::

    {raw-html}`<i class="fas fa-chalkboard"></i>`

Note: This role inserts content verbatim into HTML output.  Only use it with
trusted, author-controlled content — never with untrusted user input.
"""
from docutils import nodes
from sphinx.application import Sphinx


def raw_html_role(name, rawtext, text, lineno, inliner, options={}, content=[]):
    """Insert raw HTML as an inline node."""
    node = nodes.raw(rawtext, text, format='html')
    return [node], []


def setup(app: Sphinx) -> dict:
    app.add_role('raw-html', raw_html_role)
    return {
        'version': '0.1',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }
