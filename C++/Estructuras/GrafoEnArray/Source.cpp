#include <iostream>
#include "Graph.cpp"
#define FileDirection "E:\\GraphFile.txt"
#define FileDirection2 "E:\\GraphAmpTest.txt"
using namespace std;
/*
    
    Graph graph(6);
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
    */
void funcToShowInt(int* var)
{
    cout<<*var<<" ";
}
int main()
{
    Graph graph(6);
    graph.LoadFromFile(FileDirection2);
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
    graph.AmplitudeSearchWotDestiny(4);
    graph.showPathsToOrigin(4);


    return 0;
}
