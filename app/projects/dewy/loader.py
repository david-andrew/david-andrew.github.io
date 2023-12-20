import importlib.abc
import importlib.machinery
import sys

# Simulated file contents
file_contents = {
    'file1': """
def foo():
    print('bar')

def baz():
    return 42
""",
    'file2': """
from file1 import baz

def qux():
    return baz() + 1
"""
    # Add more files as needed
}

# Custom module loader
class StringLoader(importlib.abc.Loader):
    def __init__(self, name, code):
        self.name = name
        self.code = code

    def get_source(self, fullname):
        return self.code

    def get_filename(self, fullname):
        return '<string_loader: {}>'.format(fullname)

    def is_package(self, fullname):
        return False

    def exec_module(self, module):
        exec(compile(self.get_source(module.__name__), self.get_filename(module.__name__), 'exec'), module.__dict__)

# Custom module finder
class StringFinder(importlib.abc.MetaPathFinder):
    def find_spec(self, fullname, path, target=None):
        if fullname in file_contents:
            return importlib.machinery.ModuleSpec(fullname, StringLoader(fullname, file_contents[fullname]), is_package=False)
        return None

# Install the custom finder
sys.meta_path.insert(0, StringFinder())

# Example usage
from file1 import foo, baz as mybar
from file2 import qux

if __name__ == '__main__':
    foo()
    mybar()
    print(qux())
