#pragma once
#include <iostream>
#include <list>
#include <map>
#include <vector>
#include "Book.cpp"
#include <fstream>
using namespace std;

class Books
{
private:
    list<Book> BooksList;
public:
    Books();
    ~Books();
    void AddBook(string BookTittle);
    void AddWordsToBooksListFromFile(string BookTittle,string FileDirection);
    vector<string> getBookTitlesThatHasMoreThanXTypeOfWords(string Word,int X);
};