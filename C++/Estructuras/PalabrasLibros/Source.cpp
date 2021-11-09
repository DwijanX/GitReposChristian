#include <iostream>
#include "Books.cpp"
#define FileDirection "E:\\cien anios de soledad.txt"
#define FileDirection2 "E:\\LaOdisea.txt"
#define FileDirection3 "E:\\LaIliada.txt"

using namespace std;

int main()
{
    Books books;
    books.AddWordsToBooksListFromFile("cien años de soledad",FileDirection);
    books.AddWordsToBooksListFromFile("La Odisea",FileDirection2);
    books.AddWordsToBooksListFromFile("La Iliada",FileDirection3);
    vector<string> Titles=books.getBookTitlesThatHasMoreThanXTypeOfWords("Cien",20);
    vector<string> Titles2=books.getBookTitlesThatHasMoreThanXTypeOfWords("si",20);
    cout<<"Busqueda de 20 palabras Cien\n";
    for(int i=0;i<Titles.size();i++)
    {
        cout<<Titles[i]<<endl;
    }
    cout<<"Busqueda de 20 palabras si\n";
    for(int i=0;i<Titles2.size();i++)
    {
        cout<<Titles2[i]<<endl;
    }
    return 0;
}