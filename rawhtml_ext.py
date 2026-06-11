"""Custom Sphinx extension providing an inline raw HTML role.

Usage in MyST::

    {raw-html}`<i class="fas fa-chalkboard"></i>`
"""
from docutils import nodes
from sphinx.application import Sphinx


def raw_html_role(name, rawtext, text, lineno, inliner, options=None, content=None):
    """Insert raw HTML as an inline node."""
    node = nodes.raw('', text, format='html')
    return [node], []


def setup(app: Sphinx) -> dict:
    app.add_role('raw-html', raw_html_role)
    return {
        'version': '0.1',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }
