#include <iostream>
#include "Books.cpp"
#define FileDirection "E:\\Alfonsina.txt"
#define FileDirection2 "E:\\Neruda.txt"
#define FileDirection3 "E:\\Becquer.txt"
#define FileDirection4 "E:\\Zamudio.txt"

using namespace std;

int main()
{
    Books books;
    books.AddWordsToBooksListFromFile("Poema Alfonsina",FileDirection);
    books.AddWordsToBooksListFromFile("Poema Neruda",FileDirection2);
    books.AddWordsToBooksListFromFile("Poema Becquer",FileDirection3);
    books.AddWordsToBooksListFromFile("Poema Zamudio",FileDirection4);
    /*vector<string> Titles=books.getBookTitlesThatHasMoreThanXTypeOfWords("soledad",1);  // mas de 1
    cout<<"Buscando titulos con mas de 1 aparicion\n";
    for(int i=0;i<Titles.size();i++)
    {
        cout<<Titles[i]<<endl;
    }
    vector<string> Titles2=books.getBookTitlesThatHasMoreThanXTypeOfWords("golondrinas",0);  // mas de 0
    cout<<"Buscando titulos con al menos una aparicion de golondrinas\n";
    for(int i=0;i<Titles2.size();i++)
    {
        cout<<Titles2[i]<<endl;
    }*/
    vector<string> Titles3=books.getBookTitlesThatHasMoreThanXTypeOfWords("de",4);  // mas de 4
    cout<<"Buscando titulos con mas de 4 apariciones de de\n";
    for(int i=0;i<Titles3.size();i++)
    {
        cout<<Titles3[i]<<endl;
    }
    return 0;
}