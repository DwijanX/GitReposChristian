#include <iostream>
#include "Graph.cpp"
#define FileDirection "E:\\GraphFile.txt"
using namespace std;

void funcToShowInt(int* var)
{
    cout<<*var<<" ";
}
int main()
{
    Graph graph(5);
    graph.LoadFromFile(FileDirection);
    if(graph.AmplitudeSearch(4,1))
    {
        vector<int> aux=graph.GetSavedPath(1);
        for(int i=0;i<aux.size();i++)
        {
            cout<<aux[i]<<" ";
        }
    }
    cout<<endl;
    if(graph.DeepSearch(4,1))
    {
        vector<int> aux2=graph.GetSavedPath(1);
        for(int i=0;i<aux2.size();i++)
        {
            cout<<aux2[i]<<" ";
        }
    }
    cout<<"\n";
    graph.ShowGraph(funcToShowInt);
    return 0;
}